import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import IRequestUsersRepository from '../repositories/IRequestUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class RequestCreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('RequestUsersRepository')
        private requestUsersRepository: IRequestUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already use');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.requestUsersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default RequestCreateUserService;
