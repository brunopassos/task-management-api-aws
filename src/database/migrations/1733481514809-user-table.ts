import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1733481514809 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY,
                username VARCHAR(256) NOT NULL UNIQUE,
                password VARCHAR(256) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users
        `);
    }
}
