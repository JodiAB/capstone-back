
import { checkUser } from '../models/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
    try {
        const { userEmail, userPass } = req.body;
        const hashedPassword = await checkUser(userEmail);
        
        bcrypt.compare(userPass, hashedPassword, (err, result) => {
            if (err) throw err;
            if (result === true) {
                const token = jwt.sign({ email: userEmail }, process.env.SECRET_KEY, { expiresIn: '3m' });
                res.send({
                    token: token,
                    msg: 'You have logged in successfully'
                });
            } else {
                res.send({
                    msg: 'Invalid email or password'
                });
            }
        });
    } catch (error) {
        console.error('Invalid email or password:', error);
        res.status(404).send('Invalid email or password');
    }
};

export default login;
