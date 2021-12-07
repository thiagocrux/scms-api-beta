import mongoose from 'mongoose';
import logger from './logger';

const databaseUri = process.env.DATABASE_URI;

export default async function connectDatabase() {
  try {
    databaseUri && (await mongoose.connect(databaseUri));
    logger.info('Database was successfully connected');
  } catch (error) {
    logger.error(`${error}`);
  }
}
