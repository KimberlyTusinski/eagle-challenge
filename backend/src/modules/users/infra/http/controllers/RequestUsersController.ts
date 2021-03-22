import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import RequestCreateUserService from '@modules/users/services/RequestCreateUserService';

export default class RequestUsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(RequestCreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(classToClass(user));
    }
}
