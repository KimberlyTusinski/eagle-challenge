import { inject, injectable } from 'tsyringe';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IMedicationsRepository from '../repositories/IMedicationsRepository';
import Medication from '../infra/typeorm/entities/Medications';

interface IRequest {
    name: string;
    dosage: string;
    price?: number;
    time_course: number;
    user_id: string;
    time: {
        hour: number;
        minute: number;
    };
}

@injectable()
class CreateMedicationService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('SchedulesRepository')
        private schedulesRepository: ISchedulesRepository,

        @inject('MedicationsRepository')
        private medicationsRepository: IMedicationsRepository,
    ) {}

    public async execute({
        name,
        dosage,
        price,
        time_course,
        user_id,
        time,
    }: IRequest): Promise<Medication> {
        const checkUserExists = await this.usersRepository.findById(user_id);

        if (!checkUserExists) {
            throw new AppError('User not found');
        }

        let schedule = await this.schedulesRepository.findByTime(time);

        if (!schedule) {
            schedule = await this.schedulesRepository.create(time);
        }

        const medication = await this.medicationsRepository.create({
            name,
            dosage,
            price,
            time_course,
            user_id,
            schedule_id: schedule.id,
        });

        return medication;
    }
}

export default CreateMedicationService;
