import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes/items.js';
import userRouter from './routes/user.js';
import login from './routes/login.js';
import loginMiddleware from './middleware/Auth.js';
import cookieParser from 'cookie-parser';
import authController from './controller/authController.js';

config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
})); 

app.use(express.json()); 
app.use(cookieParser()); 



app.use('/product', router); 
app.use('/users', userRouter); 
app.use('/login', loginMiddleware, loginRouter); 
app.post('/register', authController.register);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
