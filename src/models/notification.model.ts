import { Document, model, Schema } from 'mongoose';
import { PatientDocument } from './patient.model';

export interface NotificationInput {
  sinan: string;
  observations: string | null;
  patient: PatientDocument['_id'];
}

export interface NotificationDocument extends NotificationInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    sinan: { type: String, required: true },
    observations: { type: String, default: null },
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

const notificationModel = model<NotificationDocument>(
  'Notification',
  notificationSchema
);

export default notificationModel;
