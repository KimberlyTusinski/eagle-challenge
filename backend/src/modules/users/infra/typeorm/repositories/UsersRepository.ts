import { getRepository, IsNull, Not, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserType from '@modules/users/utils/enum/UserTypeEnum';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findAllUsers({
        except_user_id,
    }: IFindAllUsersDTO): Promise<User[]> {
        let users;

        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }

    public async findAllUsersWithoutPermission(): Promise<User[]> {
        const users = await this.ormRepository.find({
            where: {
                user_type: IsNull(),
            },
        });

        return users;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
            user_type: UserType.viewer,
        });

        await this.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async delete(id: string): Promise<boolean> {
        return !!this.ormRepository.delete(id);
    }
}

export default UsersRepository;
