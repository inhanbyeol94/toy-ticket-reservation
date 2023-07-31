import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginMemberDto } from 'src/_common/dtos/auth.dto';
import { Member } from 'src/_common/entities/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Payload } from '../_common/interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}

  /** 로그인 */
  async login(member: loginMemberDto): Promise<string> {
    const findByMember: Member = await this.memberRepository.findOne({ where: { email: member.email } });
    const validatePassword = await bcrypt.compare(member.password, findByMember.password);
    if (!findByMember || !validatePassword) {
      throw new UnauthorizedException();
    }

    const payload: Payload = { id: findByMember.id, email: findByMember.email };

    return this.jwtService.sign(payload, { secret: process.env.ACCESS_SECRET_KEY, expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME });
  }

  async tokenValidateUser(payload: Payload): Promise<Member> {
    return await this.memberRepository.findOne({ where: { email: payload.email } });
  }
}
