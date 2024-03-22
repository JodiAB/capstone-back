import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEmail, getUsers, addUser, deleteUser, upUser } from '../models/database.js';

const router = express.Router();
router.use(bodyParser.json());
const emailRouter = express.Router();
emailRouter.get('/user/userEmail', fetchUserByEmail);
// Routes
router.post('/login', bodyParser.json(), login);
router.post('/register', bodyParser.json(), register);
router.get('/users', getMany);
router.post('/users', bodyParser.json(), postMany);
router.get('/user/:id', getFew);
router.delete('/user/:id', deleteMany);
router.patch('/user/:id', bodyParser.json(), patchMany);

// Controller functions

async function register(req, res) {
  try {
    const { userName, userLast, userEmail, userPass } = req.body;

    if (!userName || !userLast || !userEmail || !userPass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await getEmail(userEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(userPass, 10);
    const userId = await addUser(userName, userLast, userEmail, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
}

async function login(req, res) {
  try {
    const { userEmail, userPass } = req.body;

    // Validate input
    if (!userEmail || !userPass) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await getEmail(userEmail); 
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(userPass, user.userPass);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.userID, userEmail: user.userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const userInfo = { userId: user.userID, userName: user.userName, userEmail: user.userEmail };

    res.status(200).json({ token, userInfo });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function fetchUserByEmail(req, res) {
  const { email } = req.query;

  try {
    const user = await getEmail(email);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: 'Error fetching user by email' });
  }
}

async function getMany(req, res) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postMany(req, res) {
  try {
    const { userName, userLast, userEmail, userPass } = req.body;
    const hash = await bcrypt.hash(userPass, 10);
    await addUser(userName, userLast, userEmail, hash);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function getFew(req, res) {
  try {
    const id = +req.params.id;
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteMany(req, res) {
  try {
    const id = +req.params.id;
    await deleteUser(id);
    const users = await getUsers();
    res.json({ message: 'User deleted successfully', users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function patchMany(req, res) {
  try {
    const id = +req.params.id;
    const { userName, userLast, userEmail, userPass } = req.body;
    const hash = await bcrypt.hash(userPass, 10);
    await upUser(userName, userLast, userEmail, hash, id);
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  router,
  login,
  getMany,
  postMany,
  getFew,
  deleteMany,
  patchMany,
  register,
  fetchUserByEmail,
  emailRouter
};
