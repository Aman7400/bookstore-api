import 'dotenv/config';

import express, { Express } from 'express';

import config from './config';
import { connectDB } from './utils/db';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errors';
import morgan from 'morgan';
import routes from './routes/index';

const app: Express = express();
const port: number = Number(config.PORT);

// * Connect to Database
connectDB();

// * Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Routes
app.use(routes);

// * Error handlers
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
