import { Test, TestingModule } from '@nestjs/testing';
import { HealthServiceTypeController } from './health-service-type.controller';

describe('HealthServiceTypeController', () => {
  let controller: HealthServiceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthServiceTypeController],
    }).compile();

    controller = module.get<HealthServiceTypeController>(HealthServiceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
