import mongoose, { Mongoose } from 'mongoose';
import { IChar } from '../models/char.interface';
import { WowTokenType } from '../models/user.interface';
import bcrypt from 'bcryptjs';
import { sub } from 'date-fns';

console.log('mongoDb.ts loaded');

const Schema = mongoose.Schema;

export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  chars: IChar[];
  wowTokens: WowTokenType[];
}

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    chars: [
      {
        charid: { type: String, unique: true },
        name: String,
        server: String,
        fraction: String,
        charclass: String,
        createdAt: { type: String, default: new Date().toString() },
        earnings: [{ date: String, amount: Number }],
      },
    ],
    wowTokens: [{ date: String, price: Number }],
    currentSign: { type: String, default: sub(new Date(), { weeks: 1 }).toISOString() },
    ranges: { type: [{ from: String, to: String, fullProfit: Number }], default: [] },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const wowUser = mongoose.models.wowUser || mongoose.model('wowUser', UserSchema);

const mongooseConnection = (() => {
  let cachedConnection: Mongoose | null = null;

  return async (): Promise<Mongoose> => {
    if (cachedConnection) {
      console.log('Using cached MongoDB connection');
      return cachedConnection;
    }

    try {
      const mongoDbUri = process.env.MONGODB_EXTERNAL_URI;
      if (!mongoDbUri) {
        throw new Error('MONGODB_URI is not defined');
      }

      cachedConnection = await mongoose.connect(mongoDbUri);

      console.log('Connected to MongoDB');
      return cachedConnection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  };
})();

export const connectToDb = mongooseConnection;

console.log('inside file mongoDB.ts--> mongoDb.ts loaded, wowUser defined:', !!wowUser);
