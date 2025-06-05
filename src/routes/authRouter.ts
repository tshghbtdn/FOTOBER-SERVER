// File: src/routes/authRouter.ts
import express from 'express';
import { con_loginUser,con_logoutUser, con_registerUser } from '../controllers/authenticate-functions';


const app = express.Router();

app.post('/login', con_loginUser);
app.post('/register', con_registerUser);
app.post('/logout', con_logoutUser);

export default app;