import { addUser, deleteUser, upUser, getUser, getUsers } from '../models/database.js';

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
            await addUser(userName, userLast, userEmail, userPass);
            const users = await getUsers();
            res.send(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = +req.params.userID;
            const person = await getUser(userId);
            res.send(person);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePerson: async (req, res) => {
        const userId = req.params.id;
        try {
            const updateUser = await deleteUser(userId);
            res.json(updateUser);
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
        // Implement login logic here
    }
};
