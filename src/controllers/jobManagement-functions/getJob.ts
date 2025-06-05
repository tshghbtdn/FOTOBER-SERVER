//File: src/controllers/jobManagement-functions/getJob.ts
import { Request, Response } from 'express';
import { ser_getJob } from '../../services/jobs';

export const con_getJob = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const jobs = await ser_getJob(userId);
    res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};
