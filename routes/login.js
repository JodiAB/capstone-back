import express from "express";
import login from '../controller/login.js'; // Corrected import statement

const router = express.Router();

router
    .route('/')
    .post(login); // Using the imported login function directly

export default router;
