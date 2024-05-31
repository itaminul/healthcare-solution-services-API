import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma-service/prisma.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  async validateUsser(username: string, password: string) {
    const user = await this.prismaService.users.findUnique({
      where: { username },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async register(username: string, password: string) {
    const hashPassword = bcrypt.hashSync(password, 10);
    return this.prismaService.users.create({
      data: {
        username,
        password: hashPassword,
      },
    });
  }
}
