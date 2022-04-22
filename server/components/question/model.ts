import mongoose, { Schema, Model } from 'mongoose';
import { IQuestion } from './types';

const QuestionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  answer: {
    type: String,
  },
  likes: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
  },
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
