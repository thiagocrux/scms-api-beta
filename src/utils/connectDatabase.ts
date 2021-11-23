import mongoose from 'mongoose';
import logger from './logger';

export default async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/scms-db');
    logger.info('Database was successfully connected');
  } catch (error) {
    logger.error(`${error}`);
  }
}
