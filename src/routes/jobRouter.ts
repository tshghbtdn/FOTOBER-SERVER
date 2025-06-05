//File: src/routes/jobRouter.ts
import express from 'express';
import { con_getJob } from '../controllers/jobManagement-functions/getJob';
import { mid_authenticateUser } from '../middlewares/authUser';

const router = express.Router();

router.get('/', mid_authenticateUser, con_getJob);

export default router;
