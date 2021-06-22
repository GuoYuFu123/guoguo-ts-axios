import {
  Controller,
  Request,
  Post,
  UseGuards,
  Req,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { LocalAuthGuard } from '../auth/local.guard';

@Controller('api/users')
export class UsersController {
  constructor(private authService: AuthService) {}

  /**local */
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Req() req) {
    return { user: req.user };
  }

  @UseGuards(LocalAuthGuard)
  @Get('auth/login/local')
  authTest(@Req() req) {
    return { user: req.user };
  }
  @UseGuards(AuthGuard('local'))
  @Post('auth/post')
  authPost(@Body() body, @Req() req) {
    console.log(req);
    console.log(body);
    return { post: 'done' };
  }

  /**jwt */
  @UseGuards(LocalAuthGuard)
  @Post('auth/jwt/login')
  loginToken(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/jwt/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
