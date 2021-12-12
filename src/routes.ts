import { Express } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  findUserHandler,
  findUsersHandler,
  updateUserHandler,
} from './controllers/user.controller';

import {
  createSessionHandler,
  deleteSessionHandler,
  findSessionHandler,
  findSessionsHandler,
} from './controllers/session.controller';

import {
  createPatientHandler,
  deletePatientHandler,
  findPatientHandler,
  findPatientsHandler,
  updatePatientHandler,
} from './controllers/patient.controller';

import {
  createExamHandler,
  deleteExamHandler,
  findExamHandler,
  findExamsHandler,
  updateExamHandler,
} from './controllers/exam.controller';

import {
  createNotificationHandler,
  deleteNotificationHandler,
  findNotificationHandler,
  findNotificationsHandler,
  updateNotificationHandler,
} from './controllers/notification.controller';

import {
  createObservationHandler,
  deleteObservationHandler,
  findObservationHandler,
  findObservationsHandler,
  updateObservationHandler,
} from './controllers/observation.controller';

import {
  createTreatmentHandler,
  deleteTreatmentHandler,
  findTreatmentHandler,
  findTreatmentsHandler,
  updateTreatmentHandler,
} from './controllers/treatment.controller';

import protectRoute from './middlewares/protectRoute';

export default function routes(app: Express) {
  // User routes

  app.post('/api/users', protectRoute, createUserHandler);
  app.get('/api/users', protectRoute, findUsersHandler);
  app.get('/api/users/:userId', protectRoute, findUserHandler);
  app.patch('/api/users/:userId', protectRoute, updateUserHandler);
  app.delete('/api/users/:userId', protectRoute, deleteUserHandler);

  // Session routes

  app.post('/api/sessions', createSessionHandler);
  app.get('/api/sessions', protectRoute, findSessionsHandler);
  app.get('/api/sessions/:sessionId', protectRoute, findSessionHandler);
  app.delete('/api/sessions/:sessionId', protectRoute, deleteSessionHandler);

  // Patient routes

  app.post('/api/patients', protectRoute, createPatientHandler);
  app.get('/api/patients', protectRoute, findPatientsHandler);
  app.get('/api/patients/:patientId', protectRoute, findPatientHandler);
  app.patch('/api/patients/:patientId', protectRoute, updatePatientHandler);
  app.delete('/api/patients/:patientId', protectRoute, deletePatientHandler);

  // Exam routes

  app.post('/api/patients/:patientId/exams', protectRoute, createExamHandler);
  app.get('/api/patients/:patientId/exams', protectRoute, findExamsHandler);
  app.get(
    '/api/patients/:patientId/exams/:examId',
    protectRoute,
    findExamHandler
  );
  app.patch(
    '/api/patients/:patientId/exams/:examId',
    protectRoute,
    updateExamHandler
  );
  app.delete(
    '/api/patients/:patientId/exams/:examId',
    protectRoute,
    deleteExamHandler
  );

  // // Notification routes

  app.post(
    '/api/patients/:patientId/notifications',
    protectRoute,
    createNotificationHandler
  );
  app.get(
    '/api/patients/:patientId/notifications',
    protectRoute,
    findNotificationsHandler
  );
  app.get(
    '/api/patients/:patientId/notifications/:notificationId',
    protectRoute,
    findNotificationHandler
  );
  app.patch(
    '/api/patients/:patientId/notifications/:notificationId',
    protectRoute,
    updateNotificationHandler
  );
  app.delete(
    '/api/patients/:patientId/notifications/:notificationId',
    protectRoute,
    deleteNotificationHandler
  );

  // Observation routes

  app.post(
    '/api/patients/:patientId/observations',
    protectRoute,
    createObservationHandler
  );
  app.get(
    '/api/patients/:patientId/observations',
    protectRoute,
    findObservationsHandler
  );
  app.get(
    '/api/patients/:patientId/observations/:observationId',
    protectRoute,
    findObservationHandler
  );
  app.patch(
    '/api/patients/:patientId/observations/:observationId',
    protectRoute,
    updateObservationHandler
  );
  app.delete(
    '/api/patients/:patientId/observations/:observationId',
    protectRoute,
    deleteObservationHandler
  );

  // Treatment routes

  app.post(
    '/api/patients/:patientId/treatments',
    protectRoute,
    createTreatmentHandler
  );
  app.get(
    '/api/patients/:patientId/treatments',
    protectRoute,
    findTreatmentsHandler
  );
  app.get(
    '/api/patients/:patientId/treatments/:treatmentId',
    protectRoute,
    findTreatmentHandler
  );
  app.patch(
    '/api/patients/:patientId/treatments/:treatmentId',
    protectRoute,
    updateTreatmentHandler
  );
  app.delete(
    '/api/patients/:patientId/treatments/:treatmentId',
    protectRoute,
    deleteTreatmentHandler
  );
}
