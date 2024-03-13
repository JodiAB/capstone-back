import { addUser, checkUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Check if the user already exists in the database
    const userExists = await checkUser(email);
    if (userExists) {
      return res.status(400).send({ msg: 'User already exists' });
    }

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the user to the database
    const newUser = await addUser(name, lastName, email, hashedPassword);
    
    // Generate a JWT token for the newly registered user
    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '3m' });

    res.status(201).send({
      token: token,
      msg: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Registration failed');
  }
};

export default register;
