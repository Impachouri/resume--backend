"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resume_controller_1 = require("../controllers/resume.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const resumeRouter = (0, express_1.default)();
resumeRouter.route("/save-personal-info").post(auth_middleware_1.default, resume_controller_1.savePersonalInfo);
resumeRouter.route("/save-experience").post(auth_middleware_1.default, resume_controller_1.saveExperience);
resumeRouter.route("/save-education").post(auth_middleware_1.default, resume_controller_1.saveEducation);
resumeRouter.route("/save-project").post(auth_middleware_1.default, resume_controller_1.saveProject);
resumeRouter.route("/save-skill").post(auth_middleware_1.default, resume_controller_1.saveSkill);
resumeRouter.route("/save-achievement").post(auth_middleware_1.default, resume_controller_1.saveAchievement);
resumeRouter.route("/save-sections").post(auth_middleware_1.default, resume_controller_1.saveSections);
resumeRouter.route("/save").post(auth_middleware_1.default, resume_controller_1.saveResume);
resumeRouter.route("/fetch-resume").get(auth_middleware_1.default, resume_controller_1.fetchResume);
exports.default = resumeRouter;
