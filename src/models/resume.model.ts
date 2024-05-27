import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";

const link = {
  linkName: String,
  link: String,
  _id: false,
};

const experienceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
const Experience = mongoose.model("Experience", experienceSchema);

const projectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
const Project = mongoose.model("Project", projectSchema);

const educationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
const Education = mongoose.model("Education", educationSchema);

const skillSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  summary: String,
});
const Skill = mongoose.model("Skill", skillSchema);

const achievementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  summary: String,
});
const Achievement = mongoose.model("Achievement", achievementSchema);

const sectionsSchema = new Schema({
  experiences: [
    {
      type: Schema.Types.ObjectId,
      ref: Experience,
    },
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: Project,
    },
  ],
  educations: [
    {
      type: Schema.Types.ObjectId,
      ref: Education,
    },
  ],
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: Skill,
    },
  ],
  achievements: [
    {
      type: Schema.Types.ObjectId,
      ref: Achievement,
    },
  ],
});
const Sections = mongoose.model("Sections", sectionsSchema);

const profileBasedResumeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  sections: {
    type: Schema.Types.ObjectId,
    ref: Sections,
  },
});

const resumeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
const Resume = mongoose.model("Resume", resumeSchema);

export { Resume, Sections, Achievement, Skill, Education, Project, Experience };
