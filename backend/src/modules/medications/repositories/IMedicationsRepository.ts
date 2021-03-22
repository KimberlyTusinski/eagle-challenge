import ICreateMedicationDTO from '../dtos/ICreateMedicationDTO';
import IFindAllInDayFromUserDTO from '../dtos/IFindAllInDayFromUserDTO';
import IFindAllInMonthFromUserDTO from '../dtos/IFindAllInMonthFromUserDTO';
import Medication from '../infra/typeorm/entities/Medications';

export default interface IMedicationsRepository {
    findAllUsersMedications(): Promise<Medication[]>;
    findAllInDayFromUser(data: IFindAllInDayFromUserDTO): Promise<Medication[]>;
    findAllInMonthFromUser(
        data: IFindAllInMonthFromUserDTO,
    ): Promise<Medication[]>;
    create(data: ICreateMedicationDTO): Promise<Medication>;
    save(medication: Medication): Promise<Medication>;
}
