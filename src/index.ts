import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ HEY: "hey" });
});

app.listen(port, () => {
  console.log(`Hey i'm listening at port ${port}`);
});
