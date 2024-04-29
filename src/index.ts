import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db";
import app from "./app";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server start listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting Mongo DB ", error);
  });
