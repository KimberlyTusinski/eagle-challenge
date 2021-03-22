import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import AdminShowUsersRequestService from '@modules/users/services/AdminShowUsersRequestService';

export default class AdminShowUsersRequestController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const adminShowUsersRequest = container.resolve(
            AdminShowUsersRequestService,
        );

        const users = await adminShowUsersRequest.execute();

        return response.json(classToClass(users));
    }
}
