import { TaskEntity } from "src/task/entities/task.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'task-management-db',
    entities: [UserEntity, TaskEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
});

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => AppDataSource.initialize(),
    },
];
