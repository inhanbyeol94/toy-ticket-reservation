import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class PointHistory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  reason: string;

  @Column({ nullable: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Member, (member) => member.points, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  member: Member;
}
