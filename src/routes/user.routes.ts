import { Router } from "express";
import { singUp, singIn, signOut } from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import verifyJWT from "../middlewares/auth.middleware";

const userRouter: Router = Router();

userRouter.route("/signup").post(upload.single("profile_photo"), singUp);
userRouter.route("/signin").post(singIn);

userRouter.route("/signout").post(verifyJWT, signOut);

export default userRouter;
