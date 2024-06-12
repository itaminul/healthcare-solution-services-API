import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-service/prisma.service";
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    return this.prisma.users.findUnique({
      where: { username },
      include: { userRole: { include: { role: true } } },
    });
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      include: { userRole: { include: { role: true } } },
    });
  }
}
