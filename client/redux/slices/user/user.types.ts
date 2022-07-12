export enum UserActionsTypes {
  LOGIN = '@user/LOGIN',
  REGISTER = '@user/REGISTER',
  LOGOUT = '@user/LOGOUT',
  HAS_ERROR = '@user/HAS_ERROR',
  IS_LOADING = '@user/IS_LOADING',
}

export interface IUser {
  name: string;
  email: string;
  username: string;
  questions: any[]; //! Change it later
  followers: IUser[];
  following: IUser[];
  createdAt: Date;
  metaData?: {
    coins?: number;
    bio?: string;
    location?: string;
    webLink?: string;
    hashtag?: string;
    likes?: number;
  };
}
