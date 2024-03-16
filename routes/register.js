import express from "express";
import controller from "../controller/user.js";
const regRouter = express.Router();

regRouter.route('/register')
    .post(controller.postUser); 

    export default regRouter;