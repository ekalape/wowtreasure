import mongoose, { Mongoose } from 'mongoose';


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userid: { type: String, unique: true },
    chars: [{
        charid: { type: String, unique: true },
        name: String,
        server: String,
        fraction: String,
        class: String,
        createdAt: { type: String, default: (Date.now).toString() },
        earnings: [{ date: String, amount: Number }]
    }],
    wowTokens: [{ date: String, price: Number }]
},
    {
        toJSON: {
            transform: (doc, ret) => {
                ret._id = ret._id.toString(); // Преобразуем _id в строку
                return ret;
            },
        },
    });


let cachedConnection: Mongoose | null = null;
const mongooseConnection = (() => {
    let cachedConnection: Mongoose | null = null;

    return async (): Promise<Mongoose> => {
        if (cachedConnection) {
            console.log("Using cached MongoDB connection");
            return cachedConnection;
        }

        try {
            const mongoDbUri = process.env.MONGODB_URI;
            if (!mongoDbUri) {
                throw new Error("MONGODB_URI is not defined");
            }

            cachedConnection = await mongoose.connect(mongoDbUri, { bufferCommands: false });
            console.log("Connected to MongoDB");
            return cachedConnection;
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    };
})();

export const connectToDb = mongooseConnection;
export const wowUser = mongoose.models.wowUser || mongoose.model('wowUser', UserSchema);




