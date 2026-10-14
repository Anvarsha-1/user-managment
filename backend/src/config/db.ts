import mongoose from "mongoose"

const connectDB = async (): Promise<void> => {
    const MongoUri = process.env.MONGODB_URI;
    if (!MongoUri) {
        throw new Error("MongoDB_URI is not defined in enviornment")
    }
    await mongoose.connect(MongoUri)
    console.log("MongoDb connected successfully")
}

export default connectDB