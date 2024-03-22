// In your login route file
import express from "express";
import { login } from '../controller/user.js';
const loginRouter = express.Router();

loginRouter.route('/').post(login); 

export default loginRouter;
