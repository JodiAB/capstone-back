import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import router from './routes/items.js'
import cookieParser from 'cookie-parser';

config();

const PORT = process.env.PORT

const app = express();
app.use(cookieParser())
app.use(cors()); //middleware
app.use(express.json())
app.use('/product', router)

app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`))
