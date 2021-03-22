import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUsersService from '@modules/medications/services/ListUsersService';
import ListUsersMedicationsService from '@modules/medications/services/ListUsersMedicationsService';

export default class UsersMedicationController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsers = container.resolve(ListUsersService);

        const users = await listUsers.execute({});

        return response.json(classToClass(users));
    }

    public async indexAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsersMedications = container.resolve(
            ListUsersMedicationsService,
        );

        const medications = await listUsersMedications.execute();

        return response.json(classToClass(medications));
    }
}
