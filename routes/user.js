import express from "express";
import controller from "../controller/user.js";
const router = express.Router();

router
    .route('/')
        .get(controller.getUsers)
        .post(controller.postUser);

router
    .route("/:id")
        .get(controller.getUserById) // Specify the controller function for retrieving a user by ID
        .delete(controller.deletePerson)
        .patch(controller.patchUser);

export default router;
