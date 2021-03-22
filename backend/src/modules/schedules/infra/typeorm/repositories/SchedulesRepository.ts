import Schedule from '@modules/schedules/infra/typeorm/entities/Schedules';
import ICreateScheduleDTO from '@modules/schedules/dtos/ICreateScheduleDTO';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import { getRepository, Repository } from 'typeorm';

class SchedulesRepository implements ISchedulesRepository {
    private ormRepository: Repository<Schedule>;

    constructor() {
        this.ormRepository = getRepository(Schedule);
    }

    public async findById(id: string): Promise<Schedule | undefined> {
        const schedule = await this.ormRepository.findOne(id);

        return schedule;
    }

    public async findByTime({
        hour,
        minute,
    }: ICreateScheduleDTO): Promise<Schedule | undefined> {
        const parsedTime = `${String(hour).padStart(2, '0')}:${String(
            minute,
        ).padStart(2, '0')}:00`;

        const findSchedule = await this.ormRepository.findOne({
            where: {
                time: parsedTime,
            },
        });

        return findSchedule;
    }

    public async findAllSchedules(): Promise<Schedule[]> {
        const schedules = await this.ormRepository.find();

        return schedules;
    }

    public async create({
        hour,
        minute,
    }: ICreateScheduleDTO): Promise<Schedule> {
        const parsedTime = `${String(hour).padStart(2, '0')}:${String(
            minute,
        ).padStart(2, '0')}:00`;

        const schedule = this.ormRepository.create({ time: parsedTime });

        await this.ormRepository.save(schedule);

        return schedule;
    }
}

export default SchedulesRepository;
