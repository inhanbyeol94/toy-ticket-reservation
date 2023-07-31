import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginMemberDto } from 'src/_common/dtos/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() member: loginMemberDto, @Res() res: Response): Promise<Response> {
    const jwt = await this.authService.login(member);
    res.setHeader('Authorization', 'Bearer ' + jwt);
    return res.json({ accessToken: jwt });
  }
}
