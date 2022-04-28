import mongoose, { Schema, Model } from 'mongoose';
import { IComment } from './types';

const CommentSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);
