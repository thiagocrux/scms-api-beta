import { Document, model, Schema } from 'mongoose';
import { PatientDocument } from './patient.model';

export interface TreatmentInput {
  medication: string;
  healthCenter: string;
  startDate: string;
  dosage: string;
  observations: string;
  partnerInformation: string;
  patient: PatientDocument['_id'];
}

export interface TreatmentDocument extends TreatmentInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const treatmentSchema = new Schema<TreatmentDocument>(
  {
    medication: { type: String, required: true },
    healthCenter: { type: String, required: true },
    startDate: { type: String, required: true },
    dosage: { type: String, required: true },
    observations: { type: String, required: true },
    partnerInformation: { type: String, required: true },
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

const TreatmentModel = model<TreatmentDocument>('Treatment', treatmentSchema);

export default TreatmentModel;
