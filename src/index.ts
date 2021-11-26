import express from 'express';
import routes from './routes';
import connectDatabase from './utils/connectDatabase';
import logger from './utils/logger';

const app = express();
const port = process.env.API_PORT;

app.use(express.json());

app.listen(port, async () => {
  logger.info(`Server listening at http://localhost:${port}`);
  connectDatabase();
  routes(app);
});
