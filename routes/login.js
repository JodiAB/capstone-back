// In your login route file (e.g., login.js)
import express from "express";
import Controller from '../controller/user.js'; 
import { getUserByEmail } from '../models/database.js'; // Import the function to access database

const loginRouter = express.Router();

loginRouter.route('/').post(async (req, res) => {
  try {
    const { userEmail, userPass } = req.body;
    const userData = await getUserByEmail(userEmail);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = userData.userPass; // Assuming userPass is stored in userData
    // Check password validity here...

    // Rest of your login logic
    // Make sure to integrate the rest of the login logic from your Controller.login function here

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default loginRouter;
