import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { DoctorInformationService } from './doctor-information.service';
import { CreateDoctorInformationDto } from './dto/create.doctor.information.dto';

@Controller('doctor-information')
export class DoctorInformationController {
    constructor(public readonly doctorInformationService: DoctorInformationService){}
    @Post()
    async create(@Body() dto: CreateDoctorInformationDto) {
        try {
            const results = await this.doctorInformationService.create(dto)           
            return {
                message: 'Show Successfully',
                success: true,
                status: HttpStatus.OK,
                results,
              };
            } catch (error) {
              return { success: false, message: error.message };
            }
    }
}
