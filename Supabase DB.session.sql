CREATE TABLE jobs (
  job_code TEXT PRIMARY KEY,
  customer_name TEXT,
  create_date DATE,
  job_type INT,
  volume INT,
  sub_type INT,
  input TEXT,               -- Dùng để lưu link đầu vào
  output TEXT,              -- Dùng để lưu link kết quả đầu ra
  instruction TEXT,        
  deadline DATE,
  user_id TEXT
);