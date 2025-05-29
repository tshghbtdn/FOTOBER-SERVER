import express from 'express';

const app = express.Router();

import * as jobFunc from "../controllers/job-functions";

app.get("/:id", jobFunc.jobRead);

app.post("/create", jobFunc.jobCreate);

app.post('/update', jobFunc.jobUpdate);

export default app;