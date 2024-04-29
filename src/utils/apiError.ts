class ApiError extends Error {
  statusCode: number;
  message: string;
  data: null;
  success: boolean;
  errors: any[];

  constructor(
    statusCode: number,
    message: string,
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode || 500;
    this.data = null;
    this.message = message || "Something went wrong";
    this.success = false;
    this.errors = errors || [];

    console.log(this.message, " ", message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
