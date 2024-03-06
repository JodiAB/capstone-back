import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import router from '../backend/routes/items.js'
import cookieParser from 'cookie-parser';



config();

const PORT = process.env.PORT


const app = express();
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:7898',
    credentials:true
})); //middleware
app.use(express.json())
app.use('/product', router)

app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`))
