import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

@injectable()
class AdminShowUsersRequestService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(): Promise<User[]> {
        const users = await this.usersRepository.findAllUsersWithoutPermission();

        return users;
    }
}

export default AdminShowUsersRequestService;
