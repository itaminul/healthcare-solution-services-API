import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { PrismaService } from "src/prisma-service/prisma.service";

@Module({
  providers: [PrismaService, RoleService],
})
export class RoleModule {}
