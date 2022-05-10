import mongoose, { Schema, Model } from 'mongoose';
import { IQuestion, IComment } from './types';

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
  likers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  dislikers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
  //!FIX: Remove likes
  likes: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      isAnonymous: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

//hide `by` fields property for questions and comments if they are anonymous
QuestionSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.isAnonymous) ret.by = 'Anonymous';

    if (ret.comments) {
      ret.comments = ret.comments.map((comment: IComment) => {
        if (comment.isAnonymous) comment.by = 'Anonymous';
        return comment;
      });
    }
    return ret;
  },
});

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
