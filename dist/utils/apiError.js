"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode || 500;
        this.data = null;
        this.message = message || "Something went wrong";
        this.success = false;
        this.errors = errors || [];
        console.log(this.message, " ", message);
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
