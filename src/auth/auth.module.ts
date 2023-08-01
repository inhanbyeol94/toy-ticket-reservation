import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/_common/entities/member.entity';
import { MembersService } from 'src/members/members.service';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from 'src/_common/security/access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, MembersService, JwtAccessStrategy],
})
export class AuthModule {}
