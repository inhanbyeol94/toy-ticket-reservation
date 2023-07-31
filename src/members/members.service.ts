import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginMemberDto } from 'src/_common/dtos/auth.dto';
import { CreateMemberDto } from 'src/_common/dtos/members.dto';
import { Member } from 'src/_common/entities/member.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PointHistory } from 'src/_common/entities/pointHistory.entity';

@Injectable()
export class MembersService {
  constructor(@InjectRepository(Member) private memberRepository: Repository<Member>, private dataSource: DataSource) {}

  /** 회원가입 */
  async createMember(member: CreateMemberDto): Promise<string> {
    const emailExists: Member = await this.memberRepository.findOne({ where: { email: member.email } });
    if (emailExists) throw new HttpException('이미 존재하는 이메일 입니다.', HttpStatus.BAD_REQUEST);
    await this.transfomrPassword(member);

    await this.dataSource.transaction(async (manager) => {
      const createMember = await manager.save(Member, member);
      await manager.insert(PointHistory, {
        amount: 1000000,
        reason: '회원가입 축하 포인트',
        status: true,
        member: { id: createMember.id },
      });
    });
    return '회원가입이 완료되었습니다.';
  }

  /** 마이 프로필 */
  async findByMember(memberId: number): Promise<{ profile: Member; remainingPoints: number }> {
    const profile = await this.memberRepository.findOne({
      where: { id: memberId },
      select: { email: true, name: true, id: true },
      relations: { points: true },
    });
    return {
      profile,
      remainingPoints: profile.points.reduce((acc, cur) => (cur.status == true ? acc + cur.amount : acc - cur.amount), 0),
    };
  }

  /** 패스워드 암호화 */
  async transfomrPassword(member: loginMemberDto): Promise<void> {
    member.password = await bcrypt.hash(member.password, 10);
    return Promise.resolve();
  }
}
