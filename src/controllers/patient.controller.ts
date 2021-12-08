import { Request, Response } from 'express';
import {
  createPatient,
  deletePatient,
  findPatient,
  findPatients,
  updatePatient,
} from '../services/patient.service';

export async function createPatientHandler(
  request: Request,
  response: Response
) {
  try {
    const input = request.body;
    const createdPatient = await createPatient(input);
    return response.status(201).json(createdPatient);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findPatientHandler(request: Request, response: Response) {
  try {
    const { patientId } = request.params;
    const patientFound = await findPatient({ _id: patientId });

    if (!patientFound) {
      return response.status(404).json({ message: 'Patient not found' });
    }

    return response.status(200).json(patientFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function findPatientsHandler(
  request: Request,
  response: Response
) {
  try {
    const patientsFound = await findPatients({});

    if (!patientsFound) {
      return response.sendStatus(404);
    }

    return response.status(200).json(patientsFound);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function updatePatientHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    const update = request.body;
    const patientAfterUpdate = await updatePatient({ _id: patientId }, update);
    return response.status(200).json(patientAfterUpdate);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}

export async function deletePatientHandler(
  request: Request,
  response: Response
) {
  try {
    const { patientId } = request.params;
    await deletePatient({ _id: patientId });
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
}
