import CreateScheduleService from '@modules/schedules/services/CreateScheduleService';
import ListSchedulesService from '@modules/schedules/services/ListSchedulesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ScheduleController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { hour, minute } = request.body;

        const createSchedule = container.resolve(CreateScheduleService);

        const schedule = await createSchedule.execute({
            hour,
            minute,
        });

        return response.json(schedule);
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listSchedule = container.resolve(ListSchedulesService);

        const schedules = await listSchedule.execute();

        return response.json(schedules);
    }
}
