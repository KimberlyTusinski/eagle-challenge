import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateMedicationService from '@modules/medications/services/CreateMedicationService';

export default class MedicationsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            dosage,
            price,
            time_course,
            user_id,
            time,
        } = request.body;

        const createMedication = container.resolve(CreateMedicationService);

        const medication = await createMedication.execute({
            name,
            dosage,
            price,
            time_course,
            user_id,
            time,
        });

        return response.json(classToClass(medication));
    }
}
