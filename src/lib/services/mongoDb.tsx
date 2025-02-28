import mongoose, { Mongoose } from 'mongoose';
import { unique } from 'next/dist/build/utils';
import { env } from 'process';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userid: { type: String, unique: true },
    chars: [{
        charid: { type: String, unique: true },
        name: String,
        server: String,
        fraction: String,
        class: String,
        createdAt: { type: Date, default: Date.now },
        earnings: [{ date: Date, amount: Number }]
    }],
    createdAt: Number,
    wowTokens: [{ date: Date, price: Number }]
});


let cachedConnection: Mongoose | null = null;
export async function connectToDb() {

    if (cachedConnection) {
        console.log("Using cached MongoDB connection");
        return cachedConnection;
    }
    try {
        const mongoDbUri = process.env.MONGODB_URI;
        if (!mongoDbUri) { throw new Error("MONGODB_URI is not defined"); }

        cachedConnection = await mongoose.connect(
            mongoDbUri,
            { bufferCommands: false }
        );
        console.log("Connected to MongoDB");
        return cachedConnection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }

}
export const wowUser = mongoose.models.wowUser || mongoose.model('wowUser', UserSchema);




