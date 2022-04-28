import mongoose, { Schema, Model } from 'mongoose';
import { IQuestion } from './types';

const QuestionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    min: 5,
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

// set `by` property as 'Anonymous' if question is anonymous
QuestionSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.isAnonymous) ret.by = 'Anonymous';
    return ret;
  },
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
