import { RequestHandler } from 'express';

export const auth: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session || !req.session?.user?.email) {
      throw new Error();
    }
    next();
  } catch (e) {
    res.status(401).send('Please Authenticate');
  }
};

export default auth;
