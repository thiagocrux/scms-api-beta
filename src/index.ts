import express from 'express';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.listen(3333, () =>
  logger.info('Server listening at http://localhost:3333')
);
