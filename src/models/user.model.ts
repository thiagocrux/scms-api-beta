import { model, Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
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

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  const saltWorkFactor = Number(process.env.SALT_WORK_FACTOR);

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error: any) => false);
};

const UserModel = model('User', userSchema);

export default UserModel;
