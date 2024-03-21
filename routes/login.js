// routes/login.js

import express from 'express';
import loginController from '../controllers/auth.js';

const loginRouter = express.Router();

loginRouter.post('/', loginController);

export default loginRouter;
