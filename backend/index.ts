import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import database from './config/database.js';
import accountRouter from './routes/account.js'

dotenv.config();
database();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use('/', accountRouter);

app.listen(PORT, () => {
    console.log(`Admin backend running succesffully at ${PORT}`);
})