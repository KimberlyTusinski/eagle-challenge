export default interface ICreateMedicationDTO {
    name: string;
    dosage: string;
    price?: number;
    time_course: number;
    schedule_id: string;
    user_id: string;
}
