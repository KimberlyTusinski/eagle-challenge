import { container } from 'tsyringe';

import '@modules/users/providers';

import MedicationsRepository from '@modules/medications/infra/typeorm/repositories/MedicationsRepository';
import IMedicationsRepository from '@modules/medications/repositories/IMedicationsRepository';

import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import RequestUsersRepository from '@modules/users/infra/typeorm/repositories/RequestUsersRepository';
import IRequestUsersRepository from '@modules/users/repositories/IRequestUsersRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IRequestUsersRepository>(
    'RequestUsersRepository',
    RequestUsersRepository,
);

container.registerSingleton<IMedicationsRepository>(
    'MedicationsRepository',
    MedicationsRepository,
);

container.registerSingleton<ISchedulesRepository>(
    'SchedulesRepository',
    SchedulesRepository,
);
