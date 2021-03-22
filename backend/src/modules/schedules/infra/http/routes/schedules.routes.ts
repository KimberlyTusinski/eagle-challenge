import { Router } from 'express';
import ScheduleController from '../controllers/ScheduleController';

const schedulesRouter = Router();
const scheduleController = new ScheduleController();

schedulesRouter.post('/', scheduleController.create);

schedulesRouter.get('/all', scheduleController.index);

export default schedulesRouter;
