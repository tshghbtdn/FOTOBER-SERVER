//File: src/controllers/authenticate-functions/loginUser.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ser_getUserPassword, ser_getUserId, ser_getUserRole } from '../../services/accounts';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '8');

export const con_loginUser = async (req: Request, res: Response): Promise<void>  => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await ser_getUserPassword(username);
        if (!hashedPassword) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            res.status(401).json({ message: "Wrong password" });
            return;
        }

        const userId = await ser_getUserId(username);
        if (!userId) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const role = await ser_getUserRole(userId);
        const payload = { userId , role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });



        console.log("Token:", token); // Log the token for debugging
        
        res.status(200).json({ message: "Login successful", token: token, role: role });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.error(err); // Log the error for debugging
    }
};