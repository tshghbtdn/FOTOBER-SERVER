//File: src/services/jobs/getJob.ts
import { client } from '../../config/db';  // chắc chắn client ở đây có kiểu Client của pg
import { inter_Job } from '../../interface/Ijob';

export async function ser_getJob(userId: string): Promise<inter_Job[]> {
  const query = `
    SELECT job_code, customer_name, create_date, job_type, volume, sub_type,
           input, output, instruction, deadline
    FROM jobs
    WHERE user_id = $1
    ORDER BY create_date DESC
  `;

  try {
    const result = await client.query(query, [userId]);
    return result.rows as inter_Job[];  // ép kiểu thủ công
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Could not fetch jobs');
  }
}
