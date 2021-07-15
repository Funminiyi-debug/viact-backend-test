import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user';
import { AuthzService } from './authz.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthzService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.createUser(user);
  }

  @Get('login')
  async login(@Res() res) {
    const url: string = await this.authService.login();
    res.redirect(url);
    // return this.authService.login();
  }

  @Get('callback')
  async callback(@Req() req) {
    return 'get token from the url';
  }

  @UseGuards(AuthGuard())
  @Get('test')
  async test() {
    return 'this tests the authorization';
  }
}
