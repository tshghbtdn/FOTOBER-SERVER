import express from 'express';
import { loginUser, registerUser } from '../controllers/auth-functions';

const app = express.Router();

app.post('/login', loginUser);

app.post('/register', registerUser);

export default app;