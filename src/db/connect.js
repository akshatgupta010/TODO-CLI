import mongoose from "mongoose";
import dotenv from "dotenv"
import { fileURLToPath } from "node:url";

dotenv.config({
    path: fileURLToPath(new URL("../../.env", import.meta.url)),
    quiet: true
})

export async function connectDb() {
    if (mongoose.connection.readyState === 1) return

    if (!process.env.MONGO_URI) {
        console.log("❌ MONGO_URI is missing. Add it to your .env file");
        process.exit(1)
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 1,
            serverSelectionTimeoutMS: 5000 
        })
    } catch (error) {
        console.log("❌ Connection to database failed");
        console.log(`   ${error.message}`);
        process.exit(1)
    }
}

export async function disconnectDb() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect()
    }
}