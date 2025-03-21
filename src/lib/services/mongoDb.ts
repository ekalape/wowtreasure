import mongoose, { Mongoose } from 'mongoose';


console.log("mongoDb.ts loaded");


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userid: { type: String, unique: true },
    chars: [{
        charid: { type: String, unique: true },
        name: String,
        server: String,
        fraction: String,
        charclass: String,
        createdAt: { type: String, default: (new Date()).toString() },
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


export const wowUser = mongoose.models.wowUser || mongoose.model('wowUser', UserSchema);


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

            cachedConnection = await mongoose.connect(mongoDbUri);

            console.log("Connected to MongoDB");
            return cachedConnection;
        } catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        }
    };
})();

export const connectToDb = mongooseConnection;



console.log("inside file mongoDB.ts--> mongoDb.ts loaded, wowUser defined:", !!wowUser);
