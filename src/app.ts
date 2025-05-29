// File: src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middlewares';
const app = express();

// Cấu hình CORS cho phép các origin từ frontend khác nhau
app.use(cors({
    origin: process.env.CORS_ORIGIN, // IP máy frontend
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());

// Các router khác
import authRouter from './routes/authRouter';

//Mounding routers
app.use('/auth', authRouter);

export default app;
