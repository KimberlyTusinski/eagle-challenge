import { inject, injectable } from 'tsyringe';
import Schedule from '../infra/typeorm/entities/Schedules';
import ISchedulesRepository from '../repositories/ISchedulesRepository';

interface IRequest {
    hour: number;
    minute: number;
}

@injectable()
class CreateScheduleService {
    constructor(
        @inject('SchedulesRepository')
        private schedulesRepository: ISchedulesRepository,
    ) {}

    public async execute({ hour, minute }: IRequest): Promise<Schedule> {
        const checkScheduleExists = await this.schedulesRepository.findByTime({
            hour,
            minute,
        });

        if (checkScheduleExists) {
            return checkScheduleExists;
        }

        const schedule = await this.schedulesRepository.create({
            hour,
            minute,
        });

        return schedule;
    }
}

export default CreateScheduleService;
