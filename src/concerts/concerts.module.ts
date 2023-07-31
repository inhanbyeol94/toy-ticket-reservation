import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from 'src/_common/entities/concert.entity';
import { Member } from 'src/_common/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Member])],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
