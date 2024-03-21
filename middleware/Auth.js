// // auth.js

import { checkUser, getPerson } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
  try {
    const { userEmail, userPass } = req.body;

    // Check if the user exists and retrieve hashed password
    const hashedPassword = await checkUser(userEmail);
    if (!hashedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const match = await bcrypt.compare(userPass, hashedPassword);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User is authenticated, generate JWT token
    const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Fetch user details after login
    const userData = await getPerson(userEmail); // Assuming you fetch user data by email

    res.status(200).json({ token, userInfo: userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default login;
