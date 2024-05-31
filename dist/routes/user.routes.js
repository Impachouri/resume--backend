"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRouter = (0, express_1.Router)();
userRouter.route("/signup").post(multer_middleware_1.upload.single("profile_photo"), auth_controller_1.singUp);
userRouter.route("/signin").post(auth_controller_1.singIn);
userRouter.route("/signout").post(auth_middleware_1.default, auth_controller_1.signOut);
exports.default = userRouter;
