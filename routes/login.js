import express from "express";
import controller from '../controller/loginCont.js'

const router = express.Router();

router
    .route('/')
    .post(controller.loginCont)

export default router