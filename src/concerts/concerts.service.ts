import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConcertDto } from 'src/_common/dtos/createConcert.dto';
import { Concert } from 'src/_common/entities/concert.entity';
import { Member } from 'src/_common/entities/member.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(Concert) private concertRepository: Repository<Concert>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async createConcert(newConcert: CreateConcertDto, id: number): Promise<string> {
    const findByMember = await this.memberRepository.findOne({ where: { id } });
    if (!findByMember.isAdmin) throw new BadRequestException();
    await this.concertRepository.insert({ ...newConcert, member: { id: findByMember.id } });
    return '정상 등록되었습니다.';
  }

  async findAllConcert(): Promise<Concert[]> {
    return await this.concertRepository.find({
      relations: {
        member: true,
      },
      select: {
        member: {
          name: true,
          email: true,
        },
      },
    });
  }

  async findByConcerts(concertName: string): Promise<Concert[]> {
    if (!concertName) throw new BadRequestException();
    const findByConcertsData = this.concertRepository.find({
      where: { name: Like(`%${concertName}%`) },
      relations: {
        member: true,
      },
      select: {
        member: {
          name: true,
          email: true,
        },
      },
    });
    if (!findByConcertsData) throw new HttpException('검색 결과가 없습니다.', 404);
    return findByConcertsData;
  }

  async findByConcert(concertId: number): Promise<Concert> {
    if (!concertId) throw new BadRequestException();
    const findByConcertData = await this.concertRepository.findOne({ where: { id: concertId } });
    if (!findByConcertData) throw new HttpException('검색 결과가 없습니다.', 404);

    return findByConcertData;
  }
}
