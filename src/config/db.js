import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONOGDB_URI || "mongodb://localhost:27017/ShopClues")
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB", error)
    }
}

export default connectDB;