import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

async function dbConnect(): Promise<void> {
    try {
        await connect(MONGODB_URI, {
            dbName: 'reservationsDB',
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw error;
    }
}

export default dbConnect;
