import { Document, model, Schema } from 'mongoose';
import { PatientDocument } from './patient.model';

export interface ExamInput {
  treponemalTestType: string;
  treponemalTestResult: string;
  treponemalTestDate: string;
  treponemalTestLocation: string;
  nontreponemalVdrlTest: string;
  nontreponemalTestTitration: string;
  nontreponemalTestDate: string;
  otherNontreponemalTest: string | null;
  otherNontreponemalTestDate: string | null;
  referenceObservations: string;
  patient: PatientDocument['_id'];
}

export interface ExamDocument extends ExamInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const examSchema = new Schema<ExamDocument>(
  {
    treponemalTestType: { type: String, required: true },
    treponemalTestResult: { type: String, required: true },
    treponemalTestDate: { type: String, required: true },
    treponemalTestLocation: { type: String, required: true },
    nontreponemalVdrlTest: { type: String, required: true },
    nontreponemalTestTitration: { type: String, required: true },
    nontreponemalTestDate: { type: String, required: true },
    otherNontreponemalTest: { type: String, default: null },
    otherNontreponemalTestDate: { type: String, default: null },
    referenceObservations: { type: String, required: true },
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

const ExamModel = model<ExamDocument>('Exam', examSchema);

export default ExamModel;
