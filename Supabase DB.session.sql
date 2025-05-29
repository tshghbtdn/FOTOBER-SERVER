CREATE TABLE job_response (
    job_code UUID PRIMARY KEY REFERENCES job_request(job_code) ON DELETE CASCADE,
    output TEXT,
    status VARCHAR(20) CHECK (status IN ('processing', 'done')) NOT NULL,
    feedback TEXT,
    next_act TEXT
);
