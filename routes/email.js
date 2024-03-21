// user.js in backend routes or controller
import express from 'express';
import { fetchUserByEmail } from './controller/user.js';

const emailRouter = express.Router();


emailRouter.get('/user/userEmail', fetchUserByEmail);

export default emailRouter;
