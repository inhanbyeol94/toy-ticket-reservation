import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';
import { Member } from './member.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Concert {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false, length: 200 })
  desc: string;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.concerts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  member: Member;

  @OneToMany(() => Reservation, (reservation) => reservation.concert, {
    cascade: true,
  })
  reservations: Reservation[];
}
