import { Router } from "express";
import { singUp, singIn, signOut } from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import verifyJWT from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/signup").post(upload.single("profile_photo"), singUp);
router.route("/signin").post(singIn);

router.route("/singout").post(verifyJWT, signOut);

export default router;
