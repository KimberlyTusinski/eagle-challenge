import { inject, injectable } from 'tsyringe';
import { isBefore } from 'date-fns';

import IMedicationsRepository from '@modules/medications/repositories/IMedicationsRepository';
import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import Medication from '../infra/typeorm/entities/Medications';

interface IRequest {
    user_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    medication: Medication;
    available: boolean;
}>;

@injectable()
class ListUserDayMedicationsService {
    constructor(
        @inject('MedicationsRepository')
        private medicationsRepository: IMedicationsRepository,

        @inject('SchedulesRepository')
        private schedulesRepository: ISchedulesRepository,
    ) {}

    public async execute({
        user_id,
        year,
        month,
        day,
    }: IRequest): Promise<IResponse> {
        const medications = await this.medicationsRepository.findAllInDayFromUser(
            {
                user_id,
                year,
                month,
                day,
            },
        );

        const date = new Date(year, month - 1, day);

        const medicationsAvailableInDay = medications
            .map(medication => {
                if (medication.time_course > -1) {
                    const lastDayThisMedication = new Date(
                        medication.created_at,
                    );
                    lastDayThisMedication.setDate(
                        lastDayThisMedication.getDate() +
                            medication.time_course,
                    );

                    return {
                        medication,
                        available: isBefore(date, lastDayThisMedication),
                    };
                }
                return { medication, available: true };
            })
            .filter(medication => {
                if (medication.available) {
                    return medication.medication;
                }

                return;
            });

        const medicationsInDayAsc = medicationsAvailableInDay.sort((a, b) => {
            if (
                a.medication.name < b.medication.name &&
                a.medication.schedule.time < b.medication.schedule.time
            ) {
                return -1;
            }
            if (
                a.medication.name > b.medication.name &&
                a.medication.schedule.time > b.medication.schedule.time
            ) {
                return 1;
            }

            return 0;
        });

        return medicationsInDayAsc;
    }
}

export default ListUserDayMedicationsService;
