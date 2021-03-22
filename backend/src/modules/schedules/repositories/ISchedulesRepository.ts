import ICreateScheduleDTO from '../dtos/ICreateScheduleDTO';
import Schedule from '../infra/typeorm/entities/Schedules';

export default interface ISchedulesRepository {
    findById(id: string): Promise<Schedule | undefined>;
    findByTime(data: ICreateScheduleDTO): Promise<Schedule | undefined>;
    findAllSchedules(): Promise<Schedule[]>;
    create(data: ICreateScheduleDTO): Promise<Schedule>;
}
