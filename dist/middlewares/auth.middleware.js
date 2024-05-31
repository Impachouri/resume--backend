"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const user_model_1 = require("../models/user.model");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const verifyJWT = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const receivedToken = req.cookies.accessToken ||
        ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", ""));
    console.log("cookie ", req.cookies.accessToken);
    console.log("header ", req.header("Authorization"));
    if (!receivedToken)
        throw new apiError_1.default(401, "Unauthorised Access");
    const verifiedToken = jsonwebtoken_1.default.verify(receivedToken, process.env.ACCESS_TOKEN_SECRET);
    const user = yield user_model_1.User.findById(verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken._id).select("-password -refreshToken");
    if (!user)
        throw new apiError_1.default(401, "Invalid Access Token");
    req.user = user;
    next();
}));
exports.default = verifyJWT;
