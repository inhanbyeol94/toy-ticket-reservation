import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Request } from 'express';
import { Reservation } from 'src/_common/entities/reservation.entity';
import { accessAuthGuard } from 'src/_common/security/access.auth.guard';
import { IRequest } from 'src/_common/interfaces/request.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(accessAuthGuard)
  async findByReservations(@Req() req: IRequest): Promise<Reservation[]> {
    const { id } = req.user;
    return await this.reservationsService.findByReservations(id);
  }

  @Post(':concertId')
  @UseGuards(accessAuthGuard)
  async createReservation(@Param('concertId') concertId: number, @Req() req: IRequest): Promise<{ message: string }> {
    const { id } = req.user;
    return await this.reservationsService.createReservation(concertId, id);
  }
}
