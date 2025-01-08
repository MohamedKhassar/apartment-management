import mongoose from "mongoose";
const MONGO_DB = process.env.MONGO_DB
mongoose.connect(MONGO_DB!)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
})

mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB!")
})