import { FilterQuery, UpdateQuery } from 'mongoose';
import NotificationModel, {
  NotificationDocument,
  NotificationInput,
} from '../models/notification.model';
import logger from '../utils/logger';

export async function createNotification(input: NotificationInput) {
  try {
    const createdNotification = NotificationModel.create(input);
    return createdNotification;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findNotification(
  filter: FilterQuery<NotificationDocument>
) {
  try {
    const notificationFound = await NotificationModel.findOne(filter);

    if (!notificationFound) {
      return false;
    }

    return notificationFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findNotifications(
  filter: FilterQuery<NotificationDocument>
) {
  try {
    const notificationsFound = await NotificationModel.find(filter).lean();

    if (!notificationsFound) {
      return false;
    }

    return notificationsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateNotification(
  filter: FilterQuery<NotificationDocument>,
  update: UpdateQuery<NotificationDocument>
) {
  try {
    const updatedNotification = await NotificationModel.findOneAndUpdate(
      filter,
      update,
      {
        returnDocument: 'after',
      }
    );

    return updatedNotification;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteNotification(
  filter: FilterQuery<NotificationDocument>
) {
  try {
    const deletedNotification = await NotificationModel.findOneAndDelete(
      filter
    );
    return deletedNotification;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
