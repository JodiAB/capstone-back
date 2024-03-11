import { checkUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
    try {
        const { userEmail, userPass } = req.body;
        
        // Check if the user exists
        const hashedPassword = await checkUser(userEmail);
        if (!hashedPassword) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Compare the provided password with the hashed password
        const match = await bcrypt.compare(userPass, hashedPassword);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // If the credentials are correct, generate and return a JWT token
        const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default loginController;