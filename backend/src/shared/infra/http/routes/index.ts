import { Router } from 'express';

import medicationsRouter from '@modules/medications/infra/http/routes/medications.routes';
import schedulesRouter from '@modules/schedules/infra/http/routes/schedules.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/medications', medicationsRouter);

routes.use('/schedules', schedulesRouter);

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);

export default routes;
