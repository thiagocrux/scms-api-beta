import { omit } from 'lodash';
import logger from '../utils/logger';
import UserModel, { UserInput } from '../models/user.model';

export async function createUser(input: UserInput) {
  try {
    const userCreated = await UserModel.create(input);
    return omit(userCreated.toJSON(), 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findUser(filter: object) {
  try {
    const userFound = await UserModel.findOne(filter);

    if (!userFound) {
      return false;
    }

    return omit(userFound?.toJSON(), 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findUsers(filter: object) {
  try {
    const usersFound = await UserModel.find(filter).lean();

    if (!usersFound) {
      return false;
    }

    const usersWithoutPasswordFields = usersFound.map(user => {
      return omit(user, 'password');
    });

    return usersWithoutPasswordFields;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateUser(filter: object, update: object) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(filter, update);
    return omit(updatedUser, 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteUser(filter: object) {
  try {
    const deletedUser = await UserModel.findOneAndDelete(filter);
    return omit(deletedUser, 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
