import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}
