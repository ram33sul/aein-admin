import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import './config/env.js'
import database from './config/database.js';
import accountRouter from './routes/account.js'

database();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use('/', accountRouter);

app.listen(PORT, () => {
    console.log(`Admin backend running succesffully at ${PORT}`);
})