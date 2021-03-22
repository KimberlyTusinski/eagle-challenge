import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAllUsersWithoutPermission(): Promise<User[]>;
    findAllUsers(data?: IFindAllUsersDTO): Promise<User[]>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;
}
