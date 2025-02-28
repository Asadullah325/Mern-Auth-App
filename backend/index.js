import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/authrouter.js'
import ProductRouter from './routes/productrouter.js';
configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/api/auth', AuthRouter);
app.use('/api/products', ProductRouter);

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});