import { Request, Response } from 'express';
import {
  createExam,
  deleteExam,
  findExam,
  findExams,
  updateExam,
} from '../services/exam.service';

export async function createExamHandler(request: Request, response: Response) {
  try {
    const { patientId } = request.params;
    const input = { patient: patientId, ...request.body };
    const createdExam = await createExam(input);
    return response.status(201).json(createdExam);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findExamHandler(request: Request, response: Response) {
  try {
    const { examId } = request.params;
    const examFound = await findExam({ _id: examId });
    return response.status(200).json(examFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findExamsHandler(request: Request, response: Response) {
  try {
    const { patientId } = request.params;
    const examsFound = await findExams({ patient: patientId });
    return response.status(200).json(examsFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateExamHandler(request: Request, response: Response) {
  try {
    const { examId } = request.params;
    const update = request.body;
    const examAfterUpdate = await updateExam({ _id: examId }, update);
    return response.status(200).json(examAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deleteExamHandler(request: Request, response: Response) {
  try {
    const { examId } = request.params;
    await deleteExam({ _id: examId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
