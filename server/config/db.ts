import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/AskFm-Clone';

const connect = () => {
  const db = mongoose.connect(uri, (err: mongoose.CallbackError) => {
    if (err) {
      logger.error(err.message);
    } else {
      logger.info(`Connected to MongoDB at ${uri}`);
    }
  });
};

connect();
