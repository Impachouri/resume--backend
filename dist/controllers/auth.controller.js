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
exports.signOut = exports.singIn = exports.singUp = void 0;
const user_model_1 = require("../models/user.model");
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const singUp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fName, lName, email, password } = req.body;
    if ([fName, lName, email, password].some((data) => (data === null || data === void 0 ? void 0 : data.trim()) === "")) {
        throw new apiError_1.default(400, "All Fields are required");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (user) {
        throw new apiError_1.default(409, "User already Exits with given mail");
    }
    const profilePhotoLocalPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const profilePhoto = yield (0, cloudinary_1.default)(profilePhotoLocalPath);
    const newUser = yield user_model_1.User.create({
        fName,
        lName,
        email,
        profile_photo: (profilePhoto === null || profilePhoto === void 0 ? void 0 : profilePhoto.url) || "",
        password,
    });
    return res
        .status(201)
        .json(new apiResponse_1.default(200, newUser, "User registered Successfully"));
}));
exports.singUp = singUp;
const singIn = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new apiError_1.default(400, "Please porvide Email & Password");
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new apiError_1.default(400, "No user exits with this email");
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new apiError_1.default(400, "Entered email/password is worng.");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    yield user.save();
    const option = {
        httpOnly: true,
        secure: true,
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .json(new apiResponse_1.default(200, { user: user }, "User Singin successfully"));
}));
exports.singIn = singIn;
const signOut = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    }, {
        new: true,
    }).select("-password");
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse_1.default(200, {}, "User logged Out"));
}));
exports.signOut = signOut;
