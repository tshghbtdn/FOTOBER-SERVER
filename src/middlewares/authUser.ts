//File: src/middlewares/authUser.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const mid_authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const clientRole = req.headers['x-client-role'] as string| undefined;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    res.locals.userId = decoded.userId;
    res.locals.role = decoded.role;

    if (!res.locals.userId || !res.locals.role) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (res.locals.role !== clientRole) {
      res.status(403).json({ message: "Invalid Request" }); 
      return;
    }
    
    console.log(`Authenticated user ID: ${decoded.userId}, Role: ${decoded.role}`);


    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
