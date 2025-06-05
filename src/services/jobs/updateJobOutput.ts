//File: src/routes/jobs/jobRouter.ts
import { client } from '../../config/db';

export async function ser_updateJobOutput(
  userId: string,
  jobCode: string,
  output: string
) {
  const query = `
    UPDATE jobs
    SET output = $1
    WHERE job_code = $2 AND user_id = $3
  `;

  return client.query(query, [output, jobCode, userId]);
}
