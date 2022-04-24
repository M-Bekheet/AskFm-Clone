import { RequestHandler } from 'express';
import { appResponse } from './appResponse';

export const auth: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session?.user?.email || !req.session?.user?.userID) {
      throw new Error();
    }
    next();
  } catch (e) {
    const response = appResponse('Please Authenticate', false);
    res.status(401).send(response);
  }
};

export default auth;
