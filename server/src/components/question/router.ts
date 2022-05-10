import { Router } from 'express';
import { auth } from '../../utils';
import * as controller from './controller';

const router = Router();

// Fetch/create questions
router.get('/', auth, controller.getQuestions);
router.post('/create/:respondentID', auth, controller.createQuestion);
router.get('/timeline', auth, controller.getTimelineQuestions); //answered questions only
router.get('/:id', auth, controller.getQuestion);
router.get('/answered/:userID', controller.getAnsweredQuestions);
// Question Interactions
router.delete('/:id', auth, controller.deleteQuestion);
router.put('/:id', auth, controller.updateQuestion);
router.patch('/like/:questionID', auth, controller.likeQuestion);
router.post('/answer/:questionID', auth, controller.answerQuestion);
// Comment Interactions
router.post('/:questionID/comments', auth, controller.createComment);
router.delete(
  '/:questionID/comments/:commentID',
  auth,
  controller.deleteComment
);

export default router;
