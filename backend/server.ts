import 'colorts/lib/string';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './src/middlewares/error.middleware';
import { notFound } from './src/middlewares/notFound.middleware';
import ENV from './src/config';
import router from './src/routes';

(async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use('/api', router);

  app.use(notFound);
  app.use(errorHandler);

  app.listen(ENV.PORT, () => console.log(`🚀 Server is running in ${ENV.NODE_ENV} on port ${ENV.PORT}`.yellow.bold));
})().catch((err) => console.error(`Error: ${err}`.red));

process.on('uncaughtException', (err) => console.error(`Error: ${err}`.red));
