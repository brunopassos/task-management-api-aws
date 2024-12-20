import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    status: string

    @IsDateString()
    @IsNotEmpty()
    expirationDate: Date
}

export class TaskDto {

    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    status: string

    @IsDateString()
    @IsNotEmpty()
    expirationDate: Date

    @IsString()
    @IsNotEmpty()
    user: string
}