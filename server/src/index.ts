import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger, loggerMdl } from './utils/logger';

dotenv.config();
import './config/db';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// log all requests
app.use(loggerMdl);

app.get('/', (req: Request, res: Response) => {
  try {
    logger.info('Received request');
    res.send('MERN TypeScript Boilerplate');
  } catch (err) {
    logger.error(err);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🔥`);
});
