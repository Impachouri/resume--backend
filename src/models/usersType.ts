import { Document } from "mongoose";

interface UserDocument extends Document {
  fName: string;
  lName: string;
  email: string;
  password: string;
  profilePhoto?: string;
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
  generateRefreshToken(): string;
  generateAccessToken(): string;
}

export { UserDocument };
