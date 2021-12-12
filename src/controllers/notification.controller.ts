import { Request, Response } from 'express';
import {
  createNotification,
  deleteNotification,
  findNotification,
  findNotifications,
  updateNotification,
} from '../services/notification.service';

export async function createNotificationHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const input = { patient: patientId, ...request.body };
    const createdNotification = await createNotification(input);
    return response.status(201).json(createdNotification);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findNotificationHandler(
  request: Request,
  response: Response
) {
  try {
    const { notificationId } = request.params;
    const notificationFound = await findNotification({ _id: notificationId });
    return response.status(200).json(notificationFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findNotificationsHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const notificationsFound = await findNotifications({ patient: patientId });
    return response.status(200).json(notificationsFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateNotificationHandler(
  request: Request,
  response: Response
) {
  try {
    const { notificationId } = request.params;
    const update = request.body;
    const notificationAfterUpdate = await updateNotification(
      { _id: notificationId },
      update
    );
    return response.status(200).json(notificationAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deleteNotificationHandler(
  request: Request,
  response: Response
) {
  try {
    const { notificationId } = request.params;
    await deleteNotification({ _id: notificationId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
