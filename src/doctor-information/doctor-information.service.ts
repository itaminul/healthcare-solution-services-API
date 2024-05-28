import { Body, Injectable, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
import { CreateDoctorInformationDto } from "./dto/create.doctor.information.dto";
import { UpdateDoctorInformationDto } from "./dto/update.doctor.information.dto";

@Injectable()
export class DoctorInformationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.doctorInformation.findMany();
  }

  async create(@Body() dto: CreateDoctorInformationDto) {
    const {
      firstName,
      middleName,
      lastName,
      fullName,
      phone,
      mobileOne,
      mobileTwo,
      emergencyMobile,
      officeEmail,
      personalEmail,
      doctorImage,
      doctorSignature,
      designationId,
      dateOfBirts,
      maritialStatus,
      spousName,
      spouseProfe,
      fatherOrHusbandName,
      fatherOrHusbandProfe,
      fatherOrHusbandMobile,
      motherName,
      motherProfe,
      motherMobile,
    } = dto;
    try {
      const doctors = await this.prismaService.doctorInformation.create({
        data: {
          firstName,
          middleName,
          lastName,
          fullName,
          phone,
          mobileOne,
          mobileTwo,
          emergencyMobile,
          officeEmail,
          personalEmail,
          doctorImage,
          doctorSignature,
          designationId,
          dateOfBirts,
          maritialStatus,
          spousName,
          spouseProfe,
          fatherOrHusbandName,
          fatherOrHusbandProfe,
          fatherOrHusbandMobile,
          motherName,
          motherProfe,
          motherMobile,
        },
      });
      return { message: "Patients created successfully", doctors };
    } catch (error) {
      throw error;
    }
  }

  async update(@Param() id: number, @Body() dto: UpdateDoctorInformationDto) {
    const {
      firstName,
      middleName,
      lastName,
      fullName,
      phone,
      mobileOne,
      mobileTwo,
      emergencyMobile,
      officeEmail,
      personalEmail,
      doctorImage,
      doctorSignature,
      designationId,
      dateOfBirts,
      maritialStatus,
      spousName,
      spouseProfe,
      fatherOrHusbandName,
      fatherOrHusbandProfe,
      fatherOrHusbandMobile,
      motherName,
      motherProfe,
      motherMobile,
      activeStatus,
    } = dto;
    try {
      const doctors = await this.prismaService.doctorInformation.update({
        where: {
          id: Number(id),
        },
        data: {
          firstName,
          middleName,
          lastName,
          fullName,
          phone,
          mobileOne,
          mobileTwo,
          emergencyMobile,
          officeEmail,
          personalEmail,
          doctorImage,
          doctorSignature,
          designationId,
          dateOfBirts,
          maritialStatus,
          spousName,
          spouseProfe,
          fatherOrHusbandName,
          fatherOrHusbandProfe,
          fatherOrHusbandMobile,
          motherName,
          motherProfe,
          motherMobile,
          activeStatus,
        },
      });

      return { message: "Patients created successfully", doctors };
    } catch (error) {
      throw error;
    }
  }
}
