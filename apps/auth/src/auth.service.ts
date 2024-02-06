import { Injectable } from '@nestjs/common';
import { UsersDocument } from './users/models/users.model';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './Interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UsersDocument, response: Response) {
    const tokenPlayLoad: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPlayLoad);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
