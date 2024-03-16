import express from "express";
import Controller from '../controller/user.js'; 

const loginRouter = express.Router();

loginRouter
    .route('/')
        .post(Controller.login) 

export default loginRouter;
