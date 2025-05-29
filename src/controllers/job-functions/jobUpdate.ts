import { Request, Response } from "express";

export const jobUpdate = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json({ message: "Success" });
}