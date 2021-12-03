import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import logger from '../utils/logger';

export async function createSession(userId: any, userAgent: any) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findSessions(filter: FilterQuery<SessionDocument>) {
  try {
    const sessionsFound = await SessionModel.find(filter).lean();

    if (!sessionsFound) {
      return false;
    }

    return sessionsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateSession(
  filter: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  try {
    const updatedSession = await SessionModel.findOneAndUpdate(filter, update, {
      returnDocument: 'after',
    });

    return updatedSession;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
