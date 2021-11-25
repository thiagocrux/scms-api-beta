import { Express } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  findUserHandler,
  findUsersHandler,
  updateUserHandler,
} from './controllers/user.controller';

export default async function routes(app: Express) {
  // User routes

  app.post('/api/users', createUserHandler);

  app.get('/api/users/:userId', findUserHandler);

  app.get('/api/users/', findUsersHandler);

  app.patch('/api/users/:userId', updateUserHandler);

  app.delete('/api/users/:userId', deleteUserHandler);
}
