import { TaskDto } from "src/task/dto/create-task.dto"
import { IsArray, IsNotEmpty, IsString, Matches } from "class-validator"
import { Exclude } from "class-transformer"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class UserDto {

    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    username: string

    @Exclude()
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsArray()
    tasks: TaskDto[]
}
