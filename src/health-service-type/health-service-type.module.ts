import { Module } from '@nestjs/common';
import { HealthServiceTypeService } from './health-service-type.service';
import { HealthServiceTypeController } from './health-service-type.controller';

@Module({
  providers: [HealthServiceTypeService],
  controllers: [HealthServiceTypeController]
})
export class HealthServiceTypeModule {}
