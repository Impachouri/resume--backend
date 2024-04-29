import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserDocument } from "../models/usersType";
import { Types } from "mongoose";

export interface AuthenticateUserRequest extends Request {
  user: UserDocument;
}

export interface TokenType extends JwtPayload {
  _id?: string;
}
