import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Question } from './model';
import { appResponse, logger } from '../../utils';
import { IAnonymousQuestion } from './types';
import { User } from '../user/model';

// ask a question
const createQuestion: RequestHandler = async (req, res) => {
  try {
    let { title, isAnonymous } = req.body;
    const by = req.session.user?.userID;
    const to = req.params.respondentID;

    if (!title) {
      let response = appResponse('Title is required', false);
      return res.status(400).send(response);
    }

    if (!to) {
      let response = appResponse('Respondent is required', false);
      return res.status(400).send(response);
    }

    isAnonymous = isAnonymous === true;
    const question = await Question.create({
      title,
      to,
      isAnonymous,
      by,
    });

    if (!question) {
      let response = appResponse('Error creating question', false);
      return res.status(500).send(response);
    }

    let response = appResponse('Question created successfully', true, question);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    const response = appResponse('Error creating question.', false);
    res.status(500).send(response);
  }
};

// get a question I am asked
const getQuestion: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const to = req.session.user?.userID;
    const question = (await Question.findOne({
      _id: id,
      to,
    })) as IAnonymousQuestion;
    if (!question) {
      let response = appResponse('Question not found', false);
      return res.status(404).send(response);
    }

    let response = appResponse('Question found successfully', true, question);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    const response = appResponse('Error getting question', false);
    res.status(500).send(response);
  }
};

// get all questions I am asked
const getQuestions: RequestHandler = async (req, res) => {
  try {
    const userID = req.session.user?.userID;

    let { page = 1, limit = 0 } = req.query;
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;

    const questions = (await Question.find(
      {
        to: new mongoose.Types.ObjectId(userID),
      },
      {},
      {
        skip,
        limit,
      }
    )) as IAnonymousQuestion[];
    if (!questions || !questions.length) {
      let response = appResponse('Questions not found', false);
      return res.status(404).send(response);
    }

    let response = appResponse('Question found successfully', true, questions);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error getting question', false);
    res.status(500).send(response);
  }
};

// update a question I asked
const updateQuestion: RequestHandler = async (req, res) => {
  try {
    const { update } = req.body;
    if (!update) {
      const response = appResponse('Update is required', false);
      return res.status(400).send(response);
    }

    const id = req.params.id;
    const by = req.session.user?.userID;

    //protect from updating other users' questions
    delete update.createdAt;
    delete update.by;
    delete update.to;

    const question = await Question.findOneAndUpdate({ _id: id, by }, update, {
      new: true, // return the new updated document
    });
    if (!question) {
      const response = appResponse('Question not found', false);
      return res.status(404).send(response);
    }

    const response = appResponse(
      'Question updated successfully',
      true,
      question
    );
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error updating question', false);
    res.status(500).send(response);
  }
};

// delete a question I asked
const deleteQuestion: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const by = req.session.user?.userID;
    const question = await Question.findOneAndDelete({ _id: id, by });
    if (!question) {
      const response = appResponse('Error deleting question', false);
      return res.status(404).send(response);
    }

    const response = appResponse(
      'Question deleted successfully',
      true,
      question
    );
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error deleting question', false);
    res.status(500).send(response);
  }
};

// update like status for a question
const likeQuestion: RequestHandler = async (req, res) => {
  try {
    const id = req.params.questionID;
    const reaction = +req.body.reaction;

    if (![-1, 0, 1].includes(Math.abs(reaction))) {
      const response = appResponse('Reaction must have a valid value', false);
      return res.status(400).send(response);
    }

    const liker = req.session.user
      ?.userID as unknown as mongoose.Types.ObjectId;
    if (!liker) throw new Error('User not logged in');

    let question;
    // a like condition
    if (reaction === 1) {
      question = await Question.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            likers: liker,
          },
          $pull: {
            dislikers: liker,
          },
          $inc: {
            likes: 1,
            dislikes: -1,
          },
        },
        {
          new: true, // return the new updated document
        }
      );
    }
    // a dislike condition
    else if (reaction === -1) {
      question = await Question.findOneAndUpdate(
        { _id: id },
        {
          $addToSet: {
            dislikers: liker,
          },
          $pull: {
            likers: liker,
          },
        },
        {
          new: true, // return the new updated document
        }
      );
    }
    // a neutral condition (remove likes and dislikes)
    else {
      question = await Question.findOneAndUpdate(
        { _id: id },
        {
          $pull: {
            dislikers: liker,
            likers: liker,
          },
        },
        {
          new: true, // return the new updated document
        }
      );
    }
    const response = appResponse(
      'Question updated successfully',
      true,
      question
    );
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Fail to react to the question', false);
    res.status(500).send(response);
  }
};

/*
  > Answer a question I am asked
*/
const answerQuestion: RequestHandler = async (req, res) => {
  try {
    const questionID = req.params.questionID;
    const respondentID = req.session.user?.userID;

    const { answer } = req.body;
    if (!answer) {
      const response = appResponse('Answer is required', false);
      return res.status(400).send(response);
    }
    if (!questionID) {
      const response = appResponse('Question ID is required', false);
      return res.status(400).send(response);
    }
    const question = await Question.findOneAndUpdate(
      { _id: questionID, to: respondentID },
      {
        answer,
      }
    );

    if (!question) {
      const response = appResponse('Question not found', false);
      return res.status(404).send(response);
    }
    const response = appResponse(
      'Question answered successfully',
      true,
      question
    );
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);

    const response = appResponse('Error answering question', false);
    res.status(500).send(response);
  }
};

const getAnsweredQuestions: RequestHandler = async (req, res) => {
  try {
    const userID = req.params.userID;
    let { page = 1, limit = 10 } = req.query;
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;
    const questions = await Question.find(
      {
        to: userID,
        limit,
        skip,
      },
      {
        answer: { $nin: [null, ''] },
      }
    );
    if (!questions) {
      const response = appResponse('Questions not found', false);
      return res.status(404).send(response);
    }
    const response = appResponse('Questions found', true, questions);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    const response = appResponse('Error getting answered questions', false);
    res.status(500).send(response);
  }
};

const getTimelineQuestions: RequestHandler = async (req, res) => {
  try {
    const userID = req.session.user?.userID;
    const user = await User.findById(userID).lean();

    if (!user) {
      const response = appResponse('User not found', false);
      return res.status(404).send(response);
    } else if (!user.following || user.following.length === 0) {
      const response = appResponse('User not following anyone', false);
      return res.status(404).send(response);
    }

    let { page = 1, limit = 50 } = req.query;
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;
    const questions = await Question.find(
      {
        by: { $in: [user.following] },
        limit,
        skip,
      },
      {
        answer: { $not: { $in: [null, ''] } },
      }
    ).sort({
      _id: 1,
    });

    if (!questions) {
      const response = appResponse('Questions not found', false);
      return res.status(404).send(response);
    }
    const response = appResponse('Questions found', true, questions);
    return res.status(200).send(response);
  } catch (err) {
    logger.error(err);
    const response = appResponse('Error getting timeline questions', false);
    res.status(500).send(response);
  }
};

export {
  createQuestion,
  getQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  likeQuestion,
  answerQuestion,
  getAnsweredQuestions,
  getTimelineQuestions,
};
