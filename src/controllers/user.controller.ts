import { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  findUser,
  findUsers,
  updateUser,
} from '../services/user.service';

export async function createUserHandler(request: Request, response: Response) {
  try {
    const input = request.body;
    const createdUser = await createUser(input);
    return response.status(201).json(createdUser);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findUserHandler(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    const userFound = await findUser({ _id: userId });

    if (!userFound) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json(userFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findUsersHandler(request: Request, response: Response) {
  try {
    const usersFound = await findUsers({});

    if (!usersFound) {
      return response.sendStatus(404);
    }

    return response.status(200).json(usersFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateUserHandler(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    const update = request.body;
    const userAfterUpdate = await updateUser({ _id: userId }, update);
    return response.status(200).json(userAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deleteUserHandler(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    await deleteUser({ _id: userId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
