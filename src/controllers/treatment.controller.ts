import { Request, Response } from 'express';
import {
  createTreatment,
  deleteTreatment,
  findTreatment,
  findTreatments,
  updateTreatment,
} from '../services/treatment.service';

export async function createTreatmentHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const input = { patient: patientId, ...request.body };
    const createdTreatment = await createTreatment(input);
    return response.status(201).json(createdTreatment);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findTreatmentHandler(
  request: Request,
  response: Response
) {
  try {
    const { treatmentId } = request.params;
    const treatmentFound = await findTreatment({ _id: treatmentId });
    return response.status(200).json(treatmentFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findTreatmentsHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const treatmentsFound = await findTreatments({ patient: patientId });
    return response.status(200).json(treatmentsFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateTreatmentHandler(
  request: Request,
  response: Response
) {
  try {
    const { treatmentId } = request.params;
    const update = request.body;
    const treatmentAfterUpdate = await updateTreatment(
      { _id: treatmentId },
      update
    );
    return response.status(200).json(treatmentAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deleteTreatmentHandler(
  request: Request,
  response: Response
) {
  try {
    const { treatmentId } = request.params;
    await deleteTreatment({ _id: treatmentId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
