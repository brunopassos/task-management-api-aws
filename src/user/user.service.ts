import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { hashSync as bcryptHashSync, compareSync } from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { InjectRepository} from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserDto>{
    const userAlreadyExists = await this.usersRepository.findOne({
      where:{
        username: createUserDto.username
      }
    })

    if(userAlreadyExists){
      throw new HttpException(`User already exists`, HttpStatus.BAD_REQUEST)
    }

    const userEntity = new UserEntity()

    userEntity.username = createUserDto.username
    userEntity.password = bcryptHashSync(createUserDto.password, 10)
    userEntity.id = randomUUID(),
    userEntity.tasks = []

    const {id, password, tasks, username} = await this.usersRepository.save(userEntity)  

    return plainToInstance(UserDto, {id, password, tasks, username})
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find({
      relations: ['tasks']
    })
    return plainToInstance(UserDto, users)
  }

  async findOne(id: string): Promise<UserDto>  {
    const userFound = await this.usersRepository.findOne({
      where: {id},
      relations: ['tasks']
    })
    
    if(!userFound){
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }

    return plainToInstance(UserDto, userFound)
  }

  async findByUsername(username: string, pass: string): Promise<UserEntity | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username }
    })

    const invalidCredentialsMessage = 'Invalid username or password!';

    if(!userFound){
      throw new HttpException(
        invalidCredentialsMessage,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatches = compareSync(pass, userFound.password)

    if(!userFound || !passwordMatches){
      throw new HttpException(
        invalidCredentialsMessage,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return userFound
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    
    const userFound = await this.usersRepository.findOne({
      where: {id}
    })

    if(!userFound){
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }

    userFound.username = updateUserDto.username ?? userFound.username
    userFound.password = updateUserDto.password ? bcryptHashSync(updateUserDto.password, 10) : userFound.password

    await this.usersRepository.update(userFound.id, userFound)

    return plainToInstance(UserDto, userFound)
  }

  async remove(id: string): Promise<void> {
    const userFound = await this.usersRepository.findOne({
      where: {id}
    })
    
    if(!userFound){
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }

    await this.usersRepository.delete(id)
  }
}
