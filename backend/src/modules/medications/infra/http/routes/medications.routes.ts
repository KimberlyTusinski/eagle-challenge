import { Router } from 'express';

import MedicationController from '../controllers/MedicationController';
import UserDayMedicationsController from '../controllers/UserDayMedicationsController';
import UsersMedicationController from '../controllers/UsersMedicationController';

const medicationsRouter = Router();
const medicationController = new MedicationController();
const usersMedicationController = new UsersMedicationController();
const userDayMedicationsController = new UserDayMedicationsController();

medicationsRouter.post('/', medicationController.create);

medicationsRouter.get('/', usersMedicationController.index);
medicationsRouter.get('/all', usersMedicationController.indexAll);

medicationsRouter.get(
    '/day-medications/:user_id',
    userDayMedicationsController.index,
);

export default medicationsRouter;
