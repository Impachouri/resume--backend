import express, { Router } from "express";
import {
  fetchResume,
  saveAchievement,
  saveEducation,
  saveExperience,
  savePersonalInfo,
  saveProject,
  saveResume,
  saveSections,
  saveSkill,
} from "../controllers/resume.controller";
import verifyJWT from "../middlewares/auth.middleware";

const resumeRouter: Router = express();

resumeRouter.route("/save-personal-info").post(verifyJWT, savePersonalInfo);
resumeRouter.route("/save-experience").post(verifyJWT, saveExperience);
resumeRouter.route("/save-education").post(verifyJWT, saveEducation);
resumeRouter.route("/save-project").post(verifyJWT, saveProject);
resumeRouter.route("/save-skill").post(verifyJWT, saveSkill);
resumeRouter.route("/save-achievement").post(verifyJWT, saveAchievement);
resumeRouter.route("/save-sections").post(verifyJWT, saveSections);
resumeRouter.route("/save").post(verifyJWT, saveResume);

resumeRouter.route("/fetch-resume").get(verifyJWT, fetchResume);

export default resumeRouter;
