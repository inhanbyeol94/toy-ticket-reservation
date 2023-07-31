import { Member } from '../entities/member.entity';

export interface IRequest extends Request {
  user?: Member;
}
