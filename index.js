import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes/items.js';
import userRouter from './routes/user.js';
import loginRouter from './routes/login.js';
import loginMiddleware from './middleware/Auth.js';
import cookieParser from 'cookie-parser';
import authController from './controller/authController.js';


config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:7898',
    credentials:true
})); 
app.use(express.json()); // Middleware parsing JSON request bodies
app.use(cookieParser()); // Middleware parsing cookies



// Routes
app.use('/product', router); // Product routes
app.use('/users', userRouter); // User routes
app.use('/login', loginMiddleware, loginRouter); // Login routes
app.post('/register', authController.register);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);
