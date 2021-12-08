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

import protectRoute from './middlewares/protectRoute';

export default function routes(app: Express) {
  // User routes

  app.post('/api/users', protectRoute, createUserHandler);
  app.get('/api/users/', protectRoute, findUsersHandler);
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
  app.get('/api/patients/', protectRoute, findPatientsHandler);
  app.get('/api/patients/:patientId', protectRoute, findPatientHandler);
  app.patch('/api/patients/:patientId', protectRoute, updatePatientHandler);
  app.delete('/api/patients/:patientId', protectRoute, deletePatientHandler);
}
