import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

import UserType from '../utils/enum/UserTypeEnum';

interface IRequest {
    user_id: string;
}

@injectable()
class AdminUpdateUserPermissionService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.user_type === 'admin') {
            throw new AppError('Unauthorized user');
        }

        user.user_type = UserType.viewer;

        return this.usersRepository.save(user);
    }
}

export default AdminUpdateUserPermissionService;
