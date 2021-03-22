import ICreateMedicationDTO from '@modules/medications/dtos/ICreateMedicationDTO';
import IFindAllInDayFromUserDTO from '@modules/medications/dtos/IFindAllInDayFromUserDTO';
import IFindAllInMonthFromUserDTO from '@modules/medications/dtos/IFindAllInMonthFromUserDTO';
import IMedicationsRepository from '@modules/medications/repositories/IMedicationsRepository';
import { getRepository, Raw, Repository } from 'typeorm';
import Medication from '../entities/Medications';

class MedicationsRepository implements IMedicationsRepository {
    private ormRepository: Repository<Medication>;

    constructor() {
        this.ormRepository = getRepository(Medication);
    }

    public async findAllUsersMedications(): Promise<Medication[]> {
        const medications = await this.ormRepository.find();

        return medications;
    }

    public async findAllInDayFromUser({
        user_id,
        day,
        month,
        year,
    }: IFindAllInDayFromUserDTO): Promise<Medication[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const medications = await this.ormRepository.find({
            where: {
                user_id,
                created_at: Raw(
                    dateFieldName =>
                        `date_format(${dateFieldName}, '%d-%m-%Y') <= '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        return medications;
    }

    public async findAllInMonthFromUser({
        user_id,
        month,
        year,
    }: IFindAllInMonthFromUserDTO): Promise<Medication[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const medications = await this.ormRepository.find({
            where: {
                user_id,
                date: Raw(
                    dateFieldName =>
                        `to_chart(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return medications;
    }

    public async create(data: ICreateMedicationDTO): Promise<Medication> {
        const medication = this.ormRepository.create(data);

        await this.save(medication);

        return medication;
    }

    public async save(medication: Medication): Promise<Medication> {
        return this.ormRepository.save(medication);
    }
}

export default MedicationsRepository;
