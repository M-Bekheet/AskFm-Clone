import mongoose, { Model, Schema, ObjectId } from 'mongoose';
import { IUser } from './types';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  metaData: {
    coins: Number,
    bio: String,
    location: String,
    webLink: String,
    hashtag: String,
    likes: Number,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: 'Question',
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
