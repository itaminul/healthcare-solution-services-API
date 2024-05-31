import { Body, Controller, HttpStatus, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";

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

  @Post(":login")
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
}
