import { IComment } from '../comment/types';
import { IUser } from '../user/types';

export interface IQuestion {
  title: string;
  by: IUser;
  to: IUser;
  likers?: IUser[];
  dislikers?: IUser[];
  createdAt?: Date;
  answer?: string;
  comments?: IComment[];
  isAnonymous?: boolean;
}

export interface IAnonymousQuestion extends Omit<IQuestion, 'by'> {
  by?: 'Anonymous';
}
