import express, { Express, Request, Response } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
console.log(process.env.ORIGIN);
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes";
import resumeRouter from "./routes/resume.routes";

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.use("/user", userRouter);
app.use("/resume", resumeRouter);
app.use(errorMiddleware);

export default app;
