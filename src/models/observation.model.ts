import { Document, model, Schema } from 'mongoose';
import { PatientDocument } from './patient.model';

export interface ObservationInput {
  observations: string | null;
  partnerBeingTreated: boolean;
  patient: PatientDocument['_id'];
}

export interface ObservationDocument extends ObservationInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const observationSchema = new Schema<ObservationDocument>(
  {
    observations: { type: String, default: null },
    partnerBeingTreated: { type: Boolean, default: false },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ObservationModel = model<ObservationDocument>(
  'Observation',
  observationSchema
);

export default ObservationModel;
