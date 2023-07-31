import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PointHistory } from './pointHistory.entity';
import { Concert } from './concert.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, length: 50 })
  email: string;

  @Column({ nullable: false, length: 128 })
  password: string;

  @Column({ nullable: false, length: 10 })
  name: string;

  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PointHistory, (pointHistorys) => pointHistorys.member, {
    cascade: true,
  })
  points: PointHistory[];

  @OneToMany(() => Concert, (concerts) => concerts.member, {
    cascade: true,
  })
  concerts: Concert[];

  @OneToMany(() => Reservation, (reservation) => reservation.member, {
    cascade: true,
  })
  reservations: Reservation[];
}
