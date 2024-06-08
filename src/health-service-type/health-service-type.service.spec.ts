import { Test, TestingModule } from '@nestjs/testing';
import { HealthServiceTypeService } from './health-service-type.service';

describe('HealthServiceTypeService', () => {
  let service: HealthServiceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthServiceTypeService],
    }).compile();

    service = module.get<HealthServiceTypeService>(HealthServiceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
