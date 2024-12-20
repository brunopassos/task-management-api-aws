import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports:[],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: +process.env.EXPIRES_IN
        }
      }),
      inject: [ConfigService],
    }),
    ConfigModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
