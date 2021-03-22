import { inject, injectable } from 'tsyringe';
import Schedule from '../infra/typeorm/entities/Schedules';

import ISchedulesRepository from '../repositories/ISchedulesRepository';

@injectable()
class ListSchedulesService {
    constructor(
        @inject('SchedulesRepository')
        private schedulesRepository: ISchedulesRepository,
    ) {}

    public async execute(): Promise<Schedule[]> {
        const schedules = await this.schedulesRepository.findAllSchedules();

        return schedules;
    }
}

export default ListSchedulesService;
