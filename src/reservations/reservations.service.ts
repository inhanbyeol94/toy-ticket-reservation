import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from 'src/_common/entities/concert.entity';
import { Member } from 'src/_common/entities/member.entity';
import { PointHistory } from 'src/_common/entities/pointHistory.entity';
import { Reservation } from 'src/_common/entities/reservation.entity';
import { remainingPoints } from 'src/_util/remainingPoints';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>, private dataSource: DataSource) {}

  async findByReservations(id: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { member: { id } }, relations: { concert: true } });
  }

  async createReservation(concertId: number, memberId: number): Promise<{ message: string }> {
    await this.dataSource.transaction(async (manager) => {
      const findByMember = await manager.findOne(Member, { where: { id: memberId }, relations: { points: true } });
      const remainingPoint = remainingPoints(findByMember.points);
      const findByConcert = await manager.findOne(Concert, { where: { id: concertId } });
      if (!findByConcert) throw new NotFoundException();
      if (remainingPoint < findByConcert.price) throw new BadRequestException('잔액이 부족합니다.');
      await manager.save(Reservation, { member: { id: memberId }, concert: { id: concertId } });
      await manager.save(PointHistory, { amount: findByConcert.price, reason: '공연 예매 차감', status: false, member: { id: memberId } });
    });
    return { message: '정상 예약되었습니다.' };
  }
}
