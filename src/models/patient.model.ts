import { Document, model, Schema } from 'mongoose';

export interface PatientInput {
  susCardNumber: string;
  name: string;
  cpf: string;
  socialName: string;
  birthDate: string;
  race: string;
  sex: string;
  gender: string;
  sexuality: string;
  nationality: string;
  schooling: string;
  phone: string;
  email: string;
  motherName: string;
  fatherName: string;
  isDeceased: boolean;
  monitoringType: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  houseNumber: number;
  complement: string;
}

export interface PatientDocument extends PatientInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new Schema<PatientDocument>(
  {
    susCardNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    socialName: { type: String },
    birthDate: { type: String, required: true },
    race: { type: String, required: true },
    sex: { type: String, required: true },
    gender: { type: String, required: true },
    sexuality: { type: String, required: true },
    nationality: { type: String, required: true },
    schooling: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    motherName: { type: String, required: true },
    fatherName: { type: String },
    isDeceased: { type: Boolean, default: false },
    monitoringType: { type: String, required: true },
    zipCode: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    complement: { type: String },
  },
  {
    timestamps: true,
  }
);

const PatientModel = model<PatientDocument>('Patient', patientSchema);

export default PatientModel;
