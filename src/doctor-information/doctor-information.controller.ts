import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DoctorInformationService } from "./doctor-information.service";
import { CreateDoctorInformationDto } from "./dto/create.doctor.information.dto";
import { UpdateDoctorInformationDto } from "./dto/update.doctor.information.dto";

@Controller("doctor-information")
export class DoctorInformationController {
  constructor(
    public readonly doctorInformationService: DoctorInformationService
  ) {}
  @Get()
  async getAll() {
    try {
      const results = await this.doctorInformationService.getAll();
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post()
  async create(@Body() dto: CreateDoctorInformationDto) {
    try {
      const results = await this.doctorInformationService.create(dto);
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() dto: UpdateDoctorInformationDto
  ) {
    try {
      const results = await this.doctorInformationService.create(dto);
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
