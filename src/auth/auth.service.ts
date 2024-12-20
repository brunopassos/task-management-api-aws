import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService, private configService: ConfigService){}

    async signIn(username:string, pass: string): Promise<AuthResponseDto>{
        const user = await this.usersService.findByUsername(username, pass)

        const payload = {sub: user.id, username: user.username}
        return {
            token: await this.jwtService.signAsync(payload),
            expiresIn: +this.configService.get<number>('EXPIRES_IN')
        }
    }
}
