import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategies/jwt-auth.guard";
import { RolesGuard } from "src/role/roles.guard";
import { Roles } from "src/role/roles.decorator";
import { Users } from "@prisma/client";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma-service/prisma.service";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    public readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  @Post("register")
  async register(@Body() body) {
    const { username, password, roleId } = body;
    try {
      const results = await this.authService.register(
        username,
        password,
        roleId
      );
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post("login")
  async login(@Body() body: any, @Request() req) {
    try {
      const checkUserExists = await this.prismaService.users.findUnique({
        where: {
          username: body.username,
          activeStatus: true,
        },
      });

      if (!checkUserExists) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      const checkPassword = await compare(
        body.password,
        checkUserExists.password
      );

      delete checkUserExists.password;

      if (checkUserExists) {
        const accessToken = this.generateJWT({
          sub: checkUserExists.id,
          username: checkUserExists.username,
          emailAddress: checkUserExists.emailAddress,
          mobileNumber: checkUserExists.mobileNumber,
          deptId: checkUserExists.deptId,
          desigId: checkUserExists.desigId,
          roleId: checkUserExists.roleId,
          orgId: checkUserExists.orgId,
        });

        return {
          statusCode: 200,
          message: "Login Successfully",
          accessToken: accessToken,
        };
      } else {
        throw new HttpException(
          "User or password not match",
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (error) {}
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get("expired"),
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
