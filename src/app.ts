import express, { Express, Request, Response } from "express";
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes";

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.use("/user", userRouter);
app.use(errorMiddleware);

export default app;
