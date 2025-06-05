//File: src/controllers/jobManagement-functions/updateJobOutput.ts
import { Request, Response } from 'express';
import { ser_updateJobOutput } from '../../services/jobs';
export const con_updateJobOutput = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { jobCode } = req.params;
    const { output } = req.body;

    if (typeof output !== 'string') {
      return res.status(400).json({ message: 'Invalid output value' });
    }

    const result = await ser_updateJobOutput(userId, jobCode, output);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Job not found or no permission' });
    }

    res.status(200).json({ message: 'Output updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating output' });
  }
}