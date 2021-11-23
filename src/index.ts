import express from 'express';
import connectDatabase from './utils/connectDatabase';
import logger from './utils/logger';

const app = express();

app.use(express.json());

app.listen(3333, async () => {
  logger.info('Server listening at http://localhost:3333');
  await connectDatabase();
});
