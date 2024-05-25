import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorInformationModule } from './doctor-information/doctor-information.module';
import { PrismaModule } from './prisma-service/prisma.module';

@Module({
  imports: [DoctorInformationModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
