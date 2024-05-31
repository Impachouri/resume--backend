"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = exports.Project = exports.Education = exports.Skill = exports.Achievement = exports.Sections = exports.Resume = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("./user.model");
const link = {
    linkName: String,
    link: String,
    _id: false,
};
const experienceSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    company: {
        type: String,
        required: true,
    },
    links: [link],
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
});
const Experience = mongoose_1.default.model("Experience", experienceSchema);
exports.Experience = Experience;
const projectSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    name: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: {
        type: String,
        required: true,
    },
    links: [link],
});
const Project = mongoose_1.default.model("Project", projectSchema);
exports.Project = Project;
const educationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    institution: {
        type: String,
        required: true,
    },
    links: [link],
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
});
const Education = mongoose_1.default.model("Education", educationSchema);
exports.Education = Education;
const skillSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    summary: String,
});
const Skill = mongoose_1.default.model("Skill", skillSchema);
exports.Skill = Skill;
const achievementSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    summary: String,
});
const Achievement = mongoose_1.default.model("Achievement", achievementSchema);
exports.Achievement = Achievement;
const sectionsSchema = new mongoose_1.Schema({
    experiences: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Experience,
        },
    ],
    projects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Project,
        },
    ],
    educations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Education,
        },
    ],
    skills: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Skill,
        },
    ],
    achievements: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Achievement,
        },
    ],
});
const Sections = mongoose_1.default.model("Sections", sectionsSchema);
exports.Sections = Sections;
const profileBasedResumeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    sections: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Sections,
    },
});
const resumeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.User,
    },
    userDetails: {
        phoneNumber: String,
        location: {
            city: String,
            coutnry: String,
            _id: false,
        },
        profileSummary: String,
        links: [link],
    },
    resumes: [profileBasedResumeSchema],
});
const Resume = mongoose_1.default.model("Resume", resumeSchema);
exports.Resume = Resume;
