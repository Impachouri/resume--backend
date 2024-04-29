import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ApiError from "../utils/apiError";

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      data: err.data,
      success: err.success,
      errors: err.errors,
    });
    return;
  }

  res.status(400).json({ error: err.message });
};

export default errorMiddleware;
