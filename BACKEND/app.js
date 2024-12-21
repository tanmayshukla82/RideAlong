import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnection from './DB/db.js';
import { router as userRouter } from './routes/user.route.js';
dotenv.config();
const app = express();

DBConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

export default app;