import { FilterQuery, UpdateQuery } from 'mongoose';
import TreatmentModel, {
  TreatmentDocument,
  TreatmentInput,
} from '../models/treatment.model';
import logger from '../utils/logger';

export async function createTreatment(input: TreatmentInput) {
  try {
    const createdTreatment = TreatmentModel.create(input);
    return createdTreatment;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findTreatment(filter: FilterQuery<TreatmentDocument>) {
  try {
    const treatmentFound = await TreatmentModel.findOne(filter);

    if (!treatmentFound) {
      return false;
    }

    return treatmentFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findTreatments(filter: FilterQuery<TreatmentDocument>) {
  try {
    const treatmentsFound = await TreatmentModel.find(filter).lean();

    if (!treatmentsFound) {
      return false;
    }

    return treatmentsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateTreatment(
  filter: FilterQuery<TreatmentDocument>,
  update: UpdateQuery<TreatmentDocument>
) {
  try {
    const updatedTreatment = await TreatmentModel.findOneAndUpdate(
      filter,
      update,
      {
        returnDocument: 'after',
      }
    );

    return updatedTreatment;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteTreatment(filter: FilterQuery<TreatmentDocument>) {
  try {
    const deletedTreatment = await TreatmentModel.findOneAndDelete(filter);
    return deletedTreatment;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
