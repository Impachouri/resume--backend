"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../utils/apiError"));
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof apiError_1.default) {
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
exports.default = errorMiddleware;
