import { model, Schema } from 'mongoose';

export interface UserInput {
  name: string;
  email: string;
  password: string;
  cpf: string;
  role: string;
  professionalRegistration: string;
  councilRegistration: string;
  workLocation: string;
  phone: string;
  admin: boolean;
}

interface UserDocument extends UserInput {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    professionalRegistration: { type: String, required: true },
    councilRegistration: { type: String, required: true },
    workLocation: { type: String, required: true },
    phone: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const UserModel = model('User', userSchema);

export default UserModel;
