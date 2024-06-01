import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import cloudUpload from "../utils/cloudinary";
import { UserDocument } from "../models/usersType";
import { AuthenticateUserRequest } from "../types/types";

const singUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fName, lName, email, password } = req.body;
    if (
      [fName, lName, email, password].some(
        (data: string) => data?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All Fields are required");
    }

    const user: UserDocument | null = await User.findOne({ email });
    if (user) {
      throw new ApiError(409, "User already Exits with given mail");
    }

    const profilePhotoLocalPath = req.file?.path;

    const profilePhoto: any = await cloudUpload(profilePhotoLocalPath);

    const newUser: UserDocument = await User.create({
      fName,
      lName,
      email,
      profile_photo: profilePhoto?.url || "",
      password,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, newUser, "User registered Successfully"));
  }
);

const singIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Please porvide Email & Password");
    }

    const user: UserDocument | null = await User.findOne({ email });
    if (!user) throw new ApiError(400, "No user exits with this email");

    const isPasswordCorrect: boolean = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Entered email/password is wrong.");
    }

    const accessToken: string = user.generateAccessToken();
    const refreshToken: string = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const option = {
      httpOnly: true,
      secure: true,
      sameSite: false,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .json(new ApiResponse(200, { user: user }, "User Singin successfully"));
  }
);

const signOut = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    ).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  }
);

export { singUp, singIn, signOut };
