// authController.js

import { checkUser, getUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
    try {
        const { userEmail, userPass } = req.body;
        const user = await getUser(userEmail); 
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid email or password'
            });
        }

        bcrypt.compare(userPass, user.userPass, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
            
            if (result === true) {
                const token = jwt.sign({ userID: user.userID, userEmail: userEmail }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({
                    token: token,
                    user: user,
                    msg: 'You have logged in successfully'
                });
            } else {
                res.status(401).json({
                    msg: 'Invalid email or password'
                });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export default login;
