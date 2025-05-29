// File: src/routes/authenticationRouter.ts
import express from 'express';
import { loginUser,logoutUser, registerUser } from '../controllers/authenticate-functions';


const app = express.Router();

app.post('/login', loginUser);
app.post('/register', registerUser);
app.post('/logout', logoutUser);

export default app;