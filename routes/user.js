import express from 'express';
import {  login, getMany, postMany, getFew, deleteMany, patchMany } from '../controller/user.js';

const userRouter = express.Router();
// Routes
userRouter.post('/login', login);
userRouter.get('/users', getMany);
userRouter.post('/users', postMany);
userRouter.get('/user/:id', getFew);
userRouter.delete('/user/:id', deleteMany);
userRouter.patch('/user/:id', patchMany);

export default userRouter;
