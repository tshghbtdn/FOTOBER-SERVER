import { Request, Response } from "express";

export const jobRead = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({ message: "Success" });
}