import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from 'src/_common/entities/member.entity';
import { CreateMemberDto } from 'src/_common/dtos/members.dto';
import { accessAuthGuard } from 'src/_common/security/access.auth.guard';
import { IRequest } from 'src/_common/interfaces/request.interface';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post('register')
  @HttpCode(201)
  async createMember(@Body() member: CreateMemberDto): Promise<{ message: string }> {
    return { message: await this.membersService.createMember(member) };
  }

  @Get()
  @UseGuards(accessAuthGuard)
  async findByMember(@Req() req: IRequest): Promise<{ profile: Member; remainingPoints: number }> {
    const { id } = req.user;
    return await this.membersService.findByMember(id);
  }
}
