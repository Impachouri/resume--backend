import mongoose from "mongoose";

async function connectDB() {
  console.log(process.env.MONGODB_URI);
  try {
    const db = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log("Connected to DB - ", db.connection.name);
  } catch (error) {
    console.log("Error while connecting to DB", error);
    process.exit(1);
  }
}

export default connectDB;
