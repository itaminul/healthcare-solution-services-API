import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
