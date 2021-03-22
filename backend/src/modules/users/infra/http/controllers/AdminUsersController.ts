import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import AdminCreateUserService from '@modules/users/services/AdminCreateUserService';
import AdminUpdateUserPermissionService from '@modules/users/services/AdminUpdateUserPermissionService';
import AdminDeleteUserService from '@modules/users/services/AdminDeleteUserService';

export default class AdminUsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const adminCreateUser = container.resolve(AdminCreateUserService);

        const user = await adminCreateUser.execute({
            name,
            email,
            password,
        });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;

        const adminUpdateUserPermissionService = container.resolve(
            AdminUpdateUserPermissionService,
        );

        const user = await adminUpdateUserPermissionService.execute({
            user_id,
        });

        return response.json(classToClass(user));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;

        const adminDeleteUserService = container.resolve(
            AdminDeleteUserService,
        );

        const user = await adminDeleteUserService.execute({
            user_id,
        });

        return response.json(classToClass(user));
    }
}
