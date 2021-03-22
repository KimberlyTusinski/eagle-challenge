import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserDayMedicationsService from '@modules/medications/services/ListUserDayMedicationsService';

export default class UserDayMedicationsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;
        const { year, month, day } = request.query;

        const listUserDayMedicationsService = container.resolve(
            ListUserDayMedicationsService,
        );

        const medicationsInDay = await listUserDayMedicationsService.execute({
            user_id,
            year: Number(year),
            month: Number(month),
            day: Number(day),
        });

        return response.json(medicationsInDay);
    }
}
