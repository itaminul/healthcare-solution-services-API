import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class DoctorInformationService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll() {
        return await this.prismaService.doctorInformation.findMany()
    }
}
