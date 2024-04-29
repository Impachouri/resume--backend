import { Document, Types } from "mongoose";

interface UserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  profilePhoto?: string;
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
  generateRefreshToken(): string;
  generateAccessToken(): string;
}

export { UserDocument };
