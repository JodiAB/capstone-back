import express from "express";
import controller from "../controller/user.js";
const userRouter = express.Router();


userRouter.route('/register')
    .post(controller.postUser); 


userRouter.route('/users')
    .get(controller.getUsers); 


userRouter.route("/:id")
    .get(controller.getUserById) 
    .delete(controller.deletePerson)
    .patch(controller.patchUser);

export default userRouter;
