import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateUserMedication1616377931390
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_medications',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'dosage',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'time_course',
                        type: 'int',
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'schedule_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys('users_medications', [
            new TableForeignKey({
                name: 'UsersMedicationsSchedule',
                columnNames: ['schedule_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'schedules',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name: 'UsersMedicationsUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'users_medications',
            'UsersMedicationsUser',
        );

        await queryRunner.dropForeignKey(
            'users_medications',
            'UsersMedicationsSchedule',
        );

        await queryRunner.dropTable('users_medications');
    }
}
