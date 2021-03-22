import { Router } from 'express';
import RequestUsersController from '../controllers/RequestUsersController';
import AdminUsersController from '../controllers/AdminUsersController';
import AdminShowUsersRequestController from '../controllers/AdminShowUsersRequestController';

const usersRouter = Router();
const adminUsersController = new AdminUsersController();

const adminShowUsersRequestController = new AdminShowUsersRequestController();

const requestUsersController = new RequestUsersController();

usersRouter.post('/admin', adminUsersController.create);
usersRouter.put('/admin/:user_id', adminUsersController.update);
usersRouter.delete('/admin/:user_id', adminUsersController.delete);

usersRouter.get('/', adminShowUsersRequestController.index);

usersRouter.post('/', requestUsersController.create);

export default usersRouter;
