import { IQuestion } from '../question/types';
import { IUser } from '../user/types';

export interface IComment {
  text: string;
  by: IUser;
  question: IQuestion;
  createdAt?: Date;
}
