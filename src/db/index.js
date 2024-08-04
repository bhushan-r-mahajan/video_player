import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log(`DB Connected at host ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Mongo DB Connection Failed: ", error);
    throw error;
  }
};

export default connectDB;
