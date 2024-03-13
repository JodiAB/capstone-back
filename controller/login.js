import { checkUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
  try {
    const { userEmail, userPass } = req.body;


    const hashedPassword = await checkUser(userEmail);
    if (!hashedPassword) {
      return res.status(404).json({ message: 'User not found' });
    }

  
    const match = await bcrypt.compare(userPass, hashedPassword);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    
    // const userDetails = { email: userEmail, role: 'user' };
    // res.json({ token, user: userDetails, message: 'Login successful' });
    
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

export default login;
