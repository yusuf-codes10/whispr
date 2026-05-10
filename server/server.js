import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import handleError from './src/middlewares/handleError.js';
import catchAll from './src/middlewares/catchAll.js';
import logger from './src/middlewares/logger.js';

import registerRouter from './src/routes/register.route.js';

const port = process.env.PORT || 5100;

dotenv.config();

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// register user with streamchat
// app.post();
app.use('/register', registerRouter);

// handle errors
app.use(catchAll);
app.use(handleError);

app.listen(port, () => console.log(`server's running on ${port}`));