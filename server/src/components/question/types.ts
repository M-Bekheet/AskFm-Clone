import { ObjectId } from 'mongodb';

export interface IComment {
  _id: ObjectId;
  by: ObjectId | string;
  text: string;
  isAnonymous: boolean;
}

export interface IQuestion {
  title: string;
  by: ObjectId;
  to: ObjectId;
  likers?: ObjectId[];
  dislikers?: ObjectId[];
  createdAt?: Date;
  answer?: string;
  comments?: IComment[];
  isAnonymous?: boolean;
}

export interface IAnonymousQuestion extends Omit<IQuestion, 'by'> {
  by?: 'Anonymous';
}
