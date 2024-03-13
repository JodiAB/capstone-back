import {checkUser} from '../models/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const login = async (req, res, next) => {
    try {
        const { userEmail, userPass } = req.body;
        console.log(userEmail);
        const hashedPassword = await checkUser(userEmail);
        console.log(hashedPassword);
        bcrypt.compare(userPass, hashedPassword, (err, result) => {
            console.log(result);
            if (err) throw err;
            if (result === true) {
                console.log(userEmail);
                const token = jwt.sign({ email: userEmail }, process.env.SECRET_KEY, { expiresIn: '3m' });
                console.log(token);
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