import { Test, TestingModule } from '@nestjs/testing';
import { DoctorInformationService } from './doctor-information.service';

describe('DoctorInformationService', () => {
  let service: DoctorInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorInformationService],
    }).compile();

    service = module.get<DoctorInformationService>(DoctorInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
