import { checkUser, getUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
    try {
        const { userEmail, userPass } = req.body;
        const userData = await getUser(userEmail);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await checkUser(userEmail);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error retrieving user data' });
        }

        const match = await bcrypt.compare(userPass, hashedPassword);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, userId: user.userID });        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default login;
