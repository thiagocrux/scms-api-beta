import { omit } from 'lodash';
import logger from '../utils/logger';
import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { FilterQuery, UpdateQuery } from 'mongoose';

export async function createUser(input: UserInput) {
  try {
    const userCreated = await UserModel.create(input);
    return omit(userCreated.toJSON(), 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findUser(filter: FilterQuery<UserDocument>) {
  try {
    const userFound = await UserModel.findOne(filter);

    if (!userFound) {
      return false;
    }

    return omit(userFound, 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findUsers(filter: FilterQuery<UserDocument>) {
  try {
    const usersFound = await UserModel.find(filter).lean();

    if (!usersFound) {
      return false;
    }

    const usersWithPasswordsOmitted = usersFound.map(user => {
      return omit(user, 'password');
    });

    return usersWithPasswordsOmitted;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateUser(
  filter: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(filter, update, {
      returnDocument: 'after',
    });

    return omit(updatedUser, 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteUser(filter: FilterQuery<UserDocument>) {
  try {
    const deletedUser = await UserModel.findOneAndDelete(filter);
    return omit(deletedUser, 'password');
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
