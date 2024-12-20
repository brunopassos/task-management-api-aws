import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskTable1733481533108 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tasks (
                id UUID PRIMARY KEY,
                title VARCHAR(256) NOT NULL,
                description TEXT NOT NULL,
                status VARCHAR(256) NOT NULL,
                expiration_date TIMESTAMPTZ NOT NULL,
                user_id UUID NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE tasks
        `);
    }
}
