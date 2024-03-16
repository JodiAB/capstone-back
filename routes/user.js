import express from "express";
import controller from "../controller/user.js";
const userRouter = express.Router();

userRouter.route('/register')
    .post(controller.postUser);


userRouter.route('/:id')
    .get(controller.getUserById) 
    .delete(controller.deletePerson)
    .patch(controller.patchUser);

// Route for getting all users
userRouter.route('/')
    .get(controller.getUsers);

export default userRouter;
