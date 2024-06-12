import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany();
  }
}
