import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IRequestUsersRepository from '@modules/users/repositories/IRequestUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class RequestUsersRepository implements IRequestUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default RequestUsersRepository;
