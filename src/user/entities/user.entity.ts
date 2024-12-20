import { TaskEntity } from "../../task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryColumn({type: "uuid"})
    id: string

    @Column({type: "varchar"})
    username: string

    @Column({type: "varchar"})
    password: string

    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[]

    constructor(user?: Partial<UserEntity>){
        this.id = user?.id
        this.username = user?.username
        this.password = user?.password
        this.tasks = user?.tasks
    }

}
