import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategies/jwt-auth.guard";
import { RolesGuard } from "src/role/roles.guard";
import { Roles } from "src/role/roles.decorator";

@Controller("auth")
export class AuthController {
  constructor(public readonly authService: AuthService) {}
  @Post(":register")
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
  async login(@Request() req) {
    try {
      const results = await this.authService.login(req.user);
      return {
        success: true,
        status: HttpStatus.OK,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
