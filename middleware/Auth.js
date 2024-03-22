import { checkUser, getEmail } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
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
};

export default login;
