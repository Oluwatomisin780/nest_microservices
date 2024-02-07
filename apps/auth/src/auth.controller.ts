import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './currentUser.decorator';
import { UsersDocument } from './users/models/users.model';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: UsersDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(user, response);
    response.send(user);
  }
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate') //it helps to allow incoming rpc calls on a chosen transport layer
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
