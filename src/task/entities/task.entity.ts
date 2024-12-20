import { UserEntity } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity {

    @PrimaryColumn({type: "uuid"})
    id: string

    @Column({type: "varchar"})
    title: string

    @Column({type: "varchar"})
    description: string

    @Column({type: "varchar"})
    status: string

    @Column({name: 'expiration_date', type: 'timestamptz'})
    expirationDate: Date

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity
}
