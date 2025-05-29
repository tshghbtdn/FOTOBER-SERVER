import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getUserPassword, getUserId } from '../../services';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables.");
}

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '8');

export const loginUser = async (req: Request, res: Response): Promise<void>  => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await getUserPassword(username);
        if (!hashedPassword) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            res.status(401).json({ message: "Wrong password" });
            return;
        }

        const userId = await getUserId(username);
        const payload = { userId };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

        // Gửi token trong cookie
        res.cookie('token', token, {
            httpOnly: true, // Giúp bảo mật hơn, cookie không thể truy cập qua JavaScript
            secure: process.env.NODE_ENV === 'production', // Chỉ dùng https trong môi trường production
            maxAge: 60 * 24 * 60 * 1000, // Thời gian sống của cookie (15 phút)
            sameSite: 'strict', // Đảm bảo cookie chỉ gửi khi request từ cùng một domain
        });
        console.log("Token:", token); // Log the token for debugging
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.error(err); // Log the error for debugging
    }
};