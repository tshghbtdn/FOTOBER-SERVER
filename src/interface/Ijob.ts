//File: src/interface/Ijob.ts
export interface inter_Job {
  job_code: string;
  customer_name: string;
  create_date: string;
  job_type: number;
  volume: number;
  sub_type: number;
  input: string;
  output: string | null;
  instruction: string;
  deadline: string;
}
