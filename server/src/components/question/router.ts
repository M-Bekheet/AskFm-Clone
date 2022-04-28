import { Router } from 'express';
import { auth } from '../../utils';
import * as controller from './controller';

const router = Router();

router.post('/create/:respondentID', auth, controller.createQuestion);
router.get('/:id', auth, controller.getQuestion);
router.get('/', auth, controller.getQuestions);
router.delete('/:id', auth, controller.deleteQuestion);
router.put('/:id', auth, controller.updateQuestion);

/*
  > TODO: Add routes for:
    > - Answer a question
    > - Upvote/Downvote a question
    > - get all public(answered) questions for users I follow
    > - get all public(answered) questions for a user profile

*/

export default router;
