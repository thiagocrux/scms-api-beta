import { FilterQuery, UpdateQuery } from 'mongoose';
import ExamModel, { ExamDocument, ExamInput } from '../models/exam.model';
import logger from '../utils/logger';

export async function createExam(input: ExamInput) {
  try {
    const createdExam = ExamModel.create(input);
    return createdExam;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findExam(filter: FilterQuery<ExamDocument>) {
  try {
    const examFound = await ExamModel.findOne(filter);

    if (!examFound) {
      return false;
    }

    return examFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function findExams(filter: FilterQuery<ExamDocument>) {
  try {
    const examsFound = await ExamModel.find(filter).lean();

    if (!examsFound) {
      return false;
    }

    return examsFound;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function updateExam(
  filter: FilterQuery<ExamDocument>,
  update: UpdateQuery<ExamDocument>
) {
  try {
    const updatedExam = await ExamModel.findOneAndUpdate(filter, update, {
      returnDocument: 'after',
    });

    return updatedExam;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}

export async function deleteExam(filter: FilterQuery<ExamDocument>) {
  try {
    const deletedExam = await ExamModel.findOneAndDelete(filter);
    return deletedExam;
  } catch (error: any) {
    logger.error(`${error}`);
    throw new Error(error);
  }
}
