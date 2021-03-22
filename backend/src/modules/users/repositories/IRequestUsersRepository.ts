import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IRequestUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
