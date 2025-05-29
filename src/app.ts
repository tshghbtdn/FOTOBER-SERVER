// File: src/app.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticateUser } from './middlewares';
const app = express();

// Cấu hình CORS cho phép các origin từ frontend khác nhau
app.use(cors({
    origin: ['http://192.168.1.135:3000','http://192.168.1.71:3000'], // IP máy frontend
    credentials: true
  }));

app.use(express.json());
app.use(cookieParser());

// Các router khác
import authRouter from './routes/authRouter';
import jobRouter from './routes/jobRouter';

//Mounding routers
app.use('/auth', authRouter);
app.use('/job', jobRouter);


export default app;
