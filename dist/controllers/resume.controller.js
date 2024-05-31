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
exports.fetchResume = exports.saveSections = exports.saveAchievement = exports.saveSkill = exports.saveEducation = exports.saveProject = exports.saveExperience = exports.savePersonalInfo = exports.saveResume = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const resume_model_1 = require("../models/resume.model");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const saveResume = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(req.user);
}));
exports.saveResume = saveResume;
const saveSections = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, experiences, projects, educations, skills, achievements } = req.body;
    const sections = yield resume_model_1.Sections.create({
        experiences,
        projects,
        educations,
        skills,
        achievements,
    });
    if (!sections)
        throw new apiError_1.default(500, "Failed to save");
    const updateOperation = {
        $push: {
            resumes: {
                title,
                sections: sections._id,
            },
        },
    };
    const resume = yield resume_model_1.Resume.findOneAndUpdate({ user: req.user }, updateOperation, { new: true });
    if (!resume)
        throw new apiError_1.default(500, "Failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveSections = saveSections;
const savePersonalInfo = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, location, profileSummary, links } = req.body;
    const user = req.user;
    const userDetails = {
        phoneNumber,
        location,
        profileSummary,
        links,
    };
    const resume = yield resume_model_1.Resume.create({ user: user._id, userDetails });
    if (!resume)
        throw new apiError_1.default(500, "Failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.savePersonalInfo = savePersonalInfo;
const saveExperience = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, links, startDate, endDate, position, responsibilities } = req.body;
    const saved = yield resume_model_1.Experience.create({
        user: req.user,
        company,
        links,
        startDate,
        endDate,
        position,
        responsibilities,
    });
    if (!saved)
        throw new apiError_1.default(500, "failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveExperience = saveExperience;
const saveProject = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, liveLink, startDate, endDate, description, technologies, links, } = req.body;
    const saved = yield resume_model_1.Project.create({
        user: req.user,
        name,
        liveLink,
        startDate,
        endDate,
        description,
        technologies,
        links,
    });
    if (!saved)
        throw new apiError_1.default(500, "failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveProject = saveProject;
const saveEducation = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { institution, links, startDate, endDate, degree, grade } = req.body;
    const saved = yield resume_model_1.Education.create({
        user: req.user,
        institution,
        links,
        startDate,
        endDate,
        degree,
        grade,
    });
    if (!saved)
        throw new apiError_1.default(500, "failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveEducation = saveEducation;
const saveSkill = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { summary } = req.body;
    const saved = yield resume_model_1.Skill.create({
        user: req.user,
        summary,
    });
    if (!saved)
        throw new apiError_1.default(500, "failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveSkill = saveSkill;
const saveAchievement = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { summary } = req.body;
    const saved = yield resume_model_1.Achievement.create({
        user: req.user,
        summary,
    });
    if (!saved)
        throw new apiError_1.default(500, "failed to save");
    res.status(200).json(new apiResponse_1.default(200, "Saved Successfully"));
}));
exports.saveAchievement = saveAchievement;
const fetchResume = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const resume = yield resume_model_1.Resume.findOne({ user: user._id })
        .populate("user")
        .populate({
        path: "resumes.sections",
        populate: [
            { path: "experiences" },
            { path: "projects" },
            { path: "educations" },
            { path: "skills" },
            { path: "achievements" },
        ],
    });
    if (!resume) {
        throw new apiError_1.default(500, "Error in fetching resume");
    }
    return res.status(200).json(new apiResponse_1.default(200, resume));
}));
exports.fetchResume = fetchResume;
