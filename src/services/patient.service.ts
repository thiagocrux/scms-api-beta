import PatientModel, {
  PatientDocument,
  PatientInput,
} from '../models/patient.model';
import { FilterQuery, UpdateQuery } from 'mongoose';
import logger from '../utils/logger';

export async function createPatient(input: PatientInput) {
  try {
    const patientCreated = await PatientModel.create(input);
    return patientCreated;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findPatient(filter: FilterQuery<PatientDocument>) {
  try {
    const patientFound = await PatientModel.findOne(filter);

    if (!patientFound) {
      return false;
    }

    return patientFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findPatients(filter: FilterQuery<PatientDocument>) {
  try {
    const patientsFound = await PatientModel.find(filter).lean();

    if (!patientsFound) {
      return false;
    }

    return patientsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updatePatient(
  filter: FilterQuery<PatientDocument>,
  update: UpdateQuery<PatientDocument>
) {
  try {
    const updatedPatient = await PatientModel.findOneAndUpdate(filter, update, {
      returnDocument: 'after',
    });

    return updatedPatient;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deletePatient(filter: FilterQuery<PatientDocument>) {
  try {
    const deletedPatient = await PatientModel.findOneAndDelete(filter);
    return deletedPatient;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
