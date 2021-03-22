import { inject, injectable } from 'tsyringe';

import Medication from '../infra/typeorm/entities/Medications';
import IMedicationsRepository from '../repositories/IMedicationsRepository';

type IResponse = Array<{
    name: string;
    medications: Medication[];
}>;

@injectable()
class ListUsersMedicationsService {
    constructor(
        @inject('MedicationsRepository')
        private medicationsRepository: IMedicationsRepository,
    ) {}

    public async execute(): Promise<IResponse> {
        const allMedications = await this.medicationsRepository.findAllUsersMedications();

        const allNamesMedications = allMedications.map(
            medication => medication.name,
        );

        const distinctNamesMedications = allNamesMedications.filter(
            (name, index) => {
                if (allNamesMedications.indexOf(name) === index) {
                    return name;
                }
                return;
            },
        );

        const distinctMedications = distinctNamesMedications.map(
            distinctNameMedication => {
                const name = distinctNameMedication;

                const medications = allMedications.filter(medication => {
                    if (name === medication.name) {
                        return medication;
                    }
                    return;
                });

                return {
                    name,
                    medications,
                };
            },
        );

        return distinctMedications;
    }
}

export default ListUsersMedicationsService;
