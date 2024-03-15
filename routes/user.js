import express from "express";
import controller from "../controller/user.js";
const userRouter = express.Router();

userRouter
    .route('/')
        .get(controller.getUsers)
        .post(controller.postUser);

userRouter
    .route("/:id")
        .get(controller.getUserById) 
        .delete(controller.deletePerson)
        .patch(controller.patchUser);

export default userRouter;
