import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertUserAdminInUsers1616380306033
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "INSERT INTO eagle_challenge.users (id, name, email, password, created_at, updated_at, user_type) VALUES ('3f81d556-ef83-42c1-8a39-35b05cfcca9b','Dona Clotilde','clotilde@hotmail.com','$2a$08$FEQHsXQGuiGfd8uGAS2TAuwouE2KMzxHg27N/jdZPl1HB2Ezdn0KK','2021-03-22 02:28:02','2021-03-22 02:28:02','admin');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            "DELETE FROM eagle_challenge.users WHERE id = '3f81d556-ef83-42c1-8a39-35b05cfcca9b'",
        );
    }
}
