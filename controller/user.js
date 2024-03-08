import {addUser, deleteUser, upUser, getUser, getUsers} from '../models/database.js';

export default {

    getUs: async (req, res) => {
        res.send(await getUsers());
        },

        postUs: async (req, res) => {
            const{ userName, userLast, userEmail, userPass} = req.body;
            await addUser(userName, userLast, userEmail, userPass);
            res.send(await getUsers());
        },

        getUser: async (req, res) => {
            const uID = +req.params.userID;
            const person = await getUser(uID);
            res.send(person);
        },
        

        deletePerson: async (req, res) => {
            const usID = req.params.id;
            try{
                const updateUser = await deleteUser(userID);
                res.json(updateUser);
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
            },

            
    patchPer: async (req, res) => {
        const id = req.params.userID;
        const user = await getUser(id);
        const {userName, userLast, userEmail, userPass} = req.body;

        const upUserName = userName || user.userName;
        const upUserEmail = userEmail || user.userEmail;
        const upUserPass = userPass || user.userPass;
        const upUserLast = userLast || user.userLast;

        await upUser(upUserName, upUserEmail, upUserPass, upUserLast, id);
        res.json(await getUsers());
    }
}