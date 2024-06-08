import { Test, TestingModule } from '@nestjs/testing';
import { DoctorInformationController } from './doctor-information.controller';

describe('DoctorInformationController', () => {
  let controller: DoctorInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorInformationController],
    }).compile();

    controller = module.get<DoctorInformationController>(DoctorInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
