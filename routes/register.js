// In your registration route file (register.js)
import express from "express";
import { register } from '../controller/user.js'; 

const regRouter = express.Router();

regRouter
    .route('/')
    .post(register); 

export default regRouter;
