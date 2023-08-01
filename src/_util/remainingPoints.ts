import { PointHistory } from 'src/_common/entities/pointHistory.entity';

export const remainingPoints = (pointHistory: PointHistory[]): number => {
  return pointHistory.reduce((acc, cur) => (cur.status == true ? acc + cur.amount : acc - cur.amount), 0);
};
