import { Module } from '@nestjs/common';
import { DoctorInformationService } from './doctor-information.service';
import { DoctorInformationController } from './doctor-information.controller';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Module({
  providers: [DoctorInformationService, PrismaService],
  controllers: [DoctorInformationController]
})
export class DoctorInformationModule {}
