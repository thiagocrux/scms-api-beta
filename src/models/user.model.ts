import { model, Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInput {
  name: string;
  email: string;
  password: string;
  cpf: string;
  profession: string;
  professionalRegistration: string;
  councilRegistration: string;
  workLocation: string;
  phone: string;
  role: string;
  passwordChangedAt?: Date | null;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  verifyPasswordChangeAfterLogin(tokenIssuedTimestamp: any): any;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    profession: { type: String, required: true },
    professionalRegistration: { type: String, required: true },
    councilRegistration: { type: String, required: true },
    workLocation: { type: String, required: true },
    phone: { type: String, required: true },
    passwordChangedAt: { type: Date, default: null },
    role: {
      type: String,
      enum: ['admin', 'user', 'visitor'],
      required: true,
    },
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

userSchema.methods.verifyPasswordChangeAfterLogin = function (
  tokenIssuedAt: string
): boolean {
  if (this.passwordChangedAt) {
    let formattedTimestamp: number = +this.passwordChangedAt.getTime();
    formattedTimestamp = formattedTimestamp / 1000;
    return +tokenIssuedAt < formattedTimestamp;
  }

  // In case the password has never changed...
  return false;
};

const UserModel = model('User', userSchema);

export default UserModel;
