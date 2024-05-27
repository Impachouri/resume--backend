import { NextFunction, Response } from "express";
import { AuthenticateUserRequest } from "../types/types";
import asyncHandler from "../utils/asyncHandler";
import {
  Achievement,
  Education,
  Experience,
  Project,
  Resume,
  Sections,
  Skill,
} from "../models/resume.model";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";

const saveResume = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    res.status(200).json(req.user);
  }
);

const saveSections = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { title, experiences, projects, educations, skills, achievements } =
      req.body;

    const sections = await Sections.create({
      experiences,
      projects,
      educations,
      skills,
      achievements,
    });

    if (!sections) throw new ApiError(500, "Failed to save");

    const updateOperation = {
      $push: {
        resumes: {
          title,
          sections: sections._id,
        },
      },
    };
    const resume = await Resume.findOneAndUpdate(
      { user: req.user },
      updateOperation,
      { new: true }
    );

    if (!resume) throw new ApiError(500, "Failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const savePersonalInfo = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { phoneNumber, location, profileSummary, links } = req.body;

    const user = req.user;
    const userDetails = {
      phoneNumber,
      location,
      profileSummary,
      links,
    };

    const resume = await Resume.create({ user: user._id, userDetails });

    if (!resume) throw new ApiError(500, "Failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const saveExperience = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { company, links, startDate, endDate, position, responsibilities } =
      req.body;

    const saved = await Experience.create({
      user: req.user,
      company,
      links,
      startDate,
      endDate,
      position,
      responsibilities,
    });

    if (!saved) throw new ApiError(500, "failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const saveProject = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const {
      name,
      liveLink,
      startDate,
      endDate,
      description,
      technologies,
      links,
    } = req.body;

    const saved = await Project.create({
      user: req.user,
      name,
      liveLink,
      startDate,
      endDate,
      description,
      technologies,
      links,
    });
    if (!saved) throw new ApiError(500, "failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const saveEducation = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { institution, links, startDate, endDate, degree, grade } = req.body;

    const saved = await Education.create({
      user: req.user,
      institution,
      links,
      startDate,
      endDate,
      degree,
      grade,
    });
    if (!saved) throw new ApiError(500, "failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const saveSkill = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { summary } = req.body;

    const saved = await Skill.create({
      user: req.user,
      summary,
    });
    if (!saved) throw new ApiError(500, "failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const saveAchievement = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const { summary } = req.body;

    const saved = await Achievement.create({
      user: req.user,
      summary,
    });
    if (!saved) throw new ApiError(500, "failed to save");

    res.status(200).json(new ApiResponse(200, "Saved Successfully"));
  }
);

const fetchResume = asyncHandler(
  async (req: AuthenticateUserRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    const resume = await Resume.findOne({ user: user._id })
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
      throw new ApiError(500, "Error in fetching resume");
    }

    return res.status(200).json(new ApiResponse(200, resume));
  }
);

export {
  saveResume,
  savePersonalInfo,
  saveExperience,
  saveProject,
  saveEducation,
  saveSkill,
  saveAchievement,
  saveSections,
  fetchResume,
};
