import { Request, Response } from 'express';
import {
  createObservation,
  deleteObservation,
  findObservation,
  findObservations,
  updateObservation,
} from '../services/observation.service';

export async function createObservationHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const input = { patient: patientId, ...request.body };
    const createdObservation = await createObservation(input);
    return response.status(201).json(createdObservation);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findObservationHandler(
  request: Request,
  response: Response
) {
  try {
    const { observationId } = request.params;
    const observationFound = await findObservation({ _id: observationId });
    return response.status(200).json(observationFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findObservationsHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const observationsFound = await findObservations({ patient: patientId });
    return response.status(200).json(observationsFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updateObservationHandler(
  request: Request,
  response: Response
) {
  try {
    const { observationId } = request.params;
    const update = request.body;
    const observationAfterUpdate = await updateObservation(
      { _id: observationId },
      update
    );
    return response.status(200).json(observationAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deleteObservationHandler(
  request: Request,
  response: Response
) {
  try {
    const { observationId } = request.params;
    await deleteObservation({ _id: observationId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
