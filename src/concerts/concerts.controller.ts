import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { Concert } from 'src/_common/entities/concert.entity';
import { CreateConcertDto } from 'src/_common/dtos/createConcert.dto';
import { accessAuthGuard } from 'src/_common/security/access.auth.guard';
import { IRequest } from 'src/_common/interfaces/request.interface';

@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertsService) {}

  /** 공연 생성 */
  @Post()
  @UseGuards(accessAuthGuard)
  @HttpCode(201)
  async createConcert(@Req() req: IRequest, @Body() newConcert: CreateConcertDto): Promise<{ message: string }> {
    const { id } = req.user;
    return { message: await this.concertsService.createConcert(newConcert, id) };
  }

  /** 공연 전체 보기 */
  @Get()
  async findAllConcert(): Promise<Concert[]> {
    return await this.concertsService.findAllConcert();
  }

  /** 공연 검색 */
  @Get('search/:name')
  async findByConcerts(@Param('name') concertName: string): Promise<Concert[]> {
    return await this.concertsService.findByConcerts(concertName);
  }

  /** 공연 상세보기 */
  @Get(':id')
  async findByConcert(@Param('id', ParseIntPipe) concertId: number): Promise<Concert> {
    return await this.concertsService.findByConcert(concertId);
  }
}
