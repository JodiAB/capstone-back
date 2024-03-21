import { addUser, deleteUser, upUser, getUser, getUsers, checkUser, getUserByEmail } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  getUsers: async (req, res) => {
    try {
      const users = await getUsers();
      res.send(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const { userName, userLast, userEmail, userPass } = req.body;
      const hash = await bcrypt.hash(userPass, 10);
      await addUser(userName, userLast, userEmail, hash);
      res.send({
        msg: 'You have successfully created an account'
      });
    } catch (error) {
      console.error('Error creating an account:', error);
      res.status(500).send('Error creating an account');
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = +req.params.userID;
      const person = await getUser(userId);
      res.send(person);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  checkUser: async (userEmail) => {
    try {
      // Example: Using Sequelize ORM to retrieve hashed password
      const user = await db.User.findOne({ where: { userEmail } });
      if (!user) {
        return null;
      }
      return user.userPass;
    } catch (error) {
      throw new Error('Error checking user credentials');
    }
  },

  deletePerson: async (req, res) => {
    try {
      const userID = req.params.id;
      await deleteUser(userID);
      const users = await getUsers();
      res.json({
        msg: 'User deleted',
        users
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  patchUser: async (req, res) => {
    try {
      const id = req.params.userID;
      const user = await getUser(id);
      const { userName, userLast, userEmail, userPass } = req.body;

      const upUserName = userName || user.userName;
      const upUserEmail = userEmail || user.userEmail;
      const upUserPass = userPass || user.userPass;
      const upUserLast = userLast || user.userLast;

      await upUser(upUserName, upUserEmail, upUserPass, upUserLast, id);
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res, next) => {
    try {
      const { userEmail, userPass } = req.body;

      // Fetch user data by email using getUserByEmail function
      const user = await getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare hashed password
      const hashedPassword = await checkUser(userEmail);
      if (!hashedPassword) {
        return res.status(500).json({ message: 'Error retrieving user data' });
      }

      // Compare passwords
      const match = await bcrypt.compare(userPass, hashedPassword);
      if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });

      // Send response with token and user ID
      res.status(200).json({ token, userId: user.userID });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};