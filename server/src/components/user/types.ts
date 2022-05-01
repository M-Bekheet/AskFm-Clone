import { IQuestion } from '../question/types';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  username: string;
  questions?: IQuestion[];
  followers?: IUser[];
  following?: IUser[];
  createdAt?: Date;
  metaData?: {
    coins: number;
    bio: string;
    location: string;
    webLink: string;
    hashtag: string;
    likes: number;
  };
}
