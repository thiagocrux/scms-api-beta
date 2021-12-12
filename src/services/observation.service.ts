import { FilterQuery, UpdateQuery } from 'mongoose';
import ObservationModel, {
  ObservationDocument,
  ObservationInput,
} from '../models/observation.model';
import logger from '../utils/logger';

export async function createObservation(input: ObservationInput) {
  try {
    const createdObservation = ObservationModel.create(input);
    return createdObservation;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findObservation(
  filter: FilterQuery<ObservationDocument>
) {
  try {
    const observationFound = await ObservationModel.findOne(filter);

    if (!observationFound) {
      return false;
    }

    return observationFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findObservations(
  filter: FilterQuery<ObservationDocument>
) {
  try {
    const observationsFound = await ObservationModel.find(filter).lean();

    if (!observationsFound) {
      return false;
    }

    return observationsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateObservation(
  filter: FilterQuery<ObservationDocument>,
  update: UpdateQuery<ObservationDocument>
) {
  try {
    const updatedObservation = await ObservationModel.findOneAndUpdate(
      filter,
      update,
      {
        returnDocument: 'after',
      }
    );

    return updatedObservation;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteObservation(
  filter: FilterQuery<ObservationDocument>
) {
  try {
    const deletedObservation = await ObservationModel.findOneAndDelete(filter);
    return deletedObservation;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
