import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
const session = require('express-session');
import { loggerMdl } from './utils';
import userRouter from './components/user/router';

dotenv.config();

/*
 * Config: DB
 */
import './config';

const {
  NODE_ENV = 'development',
  PORT = 8080,
  SESS_SECRET,
  SESS_LIFETIME = 1000 * 60 * 60 * 24, // default: 1 day
} = process.env;

const IN_PROD = NODE_ENV === 'production';
const app: Express = express();

/*
 * Middleware
 */
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// log all requests
app.use(loggerMdl);

/*
 * Session Config
 */
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: +SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

/*
 * Routes
 */
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});
