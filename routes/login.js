import express from "express";
import controller from '../controller/login.js'

const router = express.Router();

router
    .route('/')
    .post(controller.login)

export default router