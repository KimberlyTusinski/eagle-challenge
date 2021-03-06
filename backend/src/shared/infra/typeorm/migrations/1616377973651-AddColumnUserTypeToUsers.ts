import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnUserTypeToUsers1616377973651
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'user_type',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'user_type');
    }
}
