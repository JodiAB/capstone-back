import express from "express";
import Controller from '../controller/user.js'; // Corrected import statement

const router = express.Router();

router
    .route('/')
        .post(Controller.login) // Using the imported login function directly

export default router;
