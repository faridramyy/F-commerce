import mongoose from "mongoose";
import secrets from "./secrets.js";

const connectDB = async (onSuccess = () => {}) => {
  try {
    await mongoose.connect(secrets.mongo.uri, {
      user: secrets.mongo.user,
      pass: secrets.mongo.pass,
      dbName: secrets.mongo.dbName,
    });

    console.log(`✅  MongoDB connected`);
    onSuccess(); // start server only AFTER DB is live
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    process.exit(1); // hard-exit if DB fails
  }
};

export default connectDB;
