// src/middlewares/authUser.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided. Unauthorized." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    res.locals.userId = decoded.userId;
    res.locals.role = decoded.role;
    
    console.log(`Authenticated user ID: ${decoded.userId}, Role: ${decoded.role}`);


    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
