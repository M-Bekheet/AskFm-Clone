import { IComment } from '../comment/types';
import { IUser } from '../user/types';

export interface IQuestion {
  title: string;
  by: IUser;
  to: IUser;
  likes?: number;
  createdAt?: Date;
  answer?: string;
  comments?: IComment[];
  isAnonymous?: boolean;
}
