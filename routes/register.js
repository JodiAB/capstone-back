import express from "express";
import Controller from '../controller/user.js'; 

const regRouter = express.Router();

regRouter
    .route('/')
        .post(Controller.register) 

export default regRouter;
