// user.js in backend routes or controller
import express from 'express';
import { fetchUserByEmail } from './controller/user.js';

const emailRouter = express.Router();

// Route to fetch user data by email
emailRouter.get('/user/userEmail', fetchUserByEmail);

export default emailRouter;
