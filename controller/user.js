import { addUser, deleteUser, upUser, getUser, getUsers } from '../models/database.js';
import bcrypt from 'bcrypt'

export default {
    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            res.send(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    postUser: async (req, res) => {
        try {
            const { userName, userLast, userEmail, userPass } = req.body;
    
            // Hash the password using bcrypt
            const hash = await bcrypt.hash(userPass, 10);
    
            // Add the user with the hashed password
            await addUser(userName, userLast, userEmail, hash);
    
            // Send a success response
            res.send({
                msg: 'You have successfully created an account'
            });
        } catch (error) {
            // Handle errors
            console.error('Error creating an account:', error);
            res.status(500).send('Error creating an account');
        }
    },
    

    getUserById: async (req, res) => {
        try {
            const userId = +req.params.id;
            const person = await getUser(userId);
            res.send(person);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePerson: async (req, res) => {
        try {
            const userID = req.params.id;
            await deleteUser(userID)
            const users = await getUsers()
            res.json({
                msg: 'User deleted', users
            })
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    patchUser: async (req, res) => {
        try {
            const id = req.params.userID;
            const user = await getUser(id);
            const { userName, userLast, userEmail, userPass } = req.body;

            const upUserName = userName || user.userName;
            const upUserEmail = userEmail || user.userEmail;
            const upUserPass = userPass || user.userPass;
            const upUserLast = userLast || user.userLast;

            await upUser(upUserName, upUserEmail, upUserPass, upUserLast, id);
            const users = await getUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
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
    }
};
