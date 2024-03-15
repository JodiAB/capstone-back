import express from "express";
import Controller from '../controller/user.js'; 

const router = express.Router();

router
    .route('/')
        .post(Controller.login) 

export default router;
