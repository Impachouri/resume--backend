import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";
import { User } from "../models/user.model";
import { AuthenticateUserRequest, TokenType } from "../types/types";
import asyncHandler from "../utils/asyncHandler";

const verifyJWT = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const receivedToken: string | undefined =
      req.cookies?.("accessToken") ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!receivedToken) throw new ApiError(401, "Unauthorised Access");

    const verifiedToken = jwt.verify(
      receivedToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as TokenType;
    const user = await User.findById(verifiedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  }
);

export default verifyJWT;
