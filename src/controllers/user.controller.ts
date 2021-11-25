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
    const user = await createUser(input);
    return response.status(201).json({ user });
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findUserHandler(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    const user = await findUser({ _id: userId });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findUsersHandler(request: Request, response: Response) {
  try {
    const users = await findUsers({});

    if (!users) {
      return response.status(404);
    }

    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateUserHandler(request: Request, response: Response) {
  try {
    const { userId } = request.params;
    const update = request.body;
    const user = await updateUser({ _id: userId }, update);
    return response.status(200).json(user);
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
