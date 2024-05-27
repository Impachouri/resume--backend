import { UserDocument } from "../models/usersType";

export type link = {
  linkName: string;
  link: string;
};

export type ExperienceType = {
  company: string;
  links: link[];
  start_date: string;
  end_date: string;
  position: string;
  responsibilities: string;
};

export type ProjectType = {
  name: string;
  liveLink: string;
  start_date: string;
  end_date: string;
  description: string;
  technologies: string;
  links: link[];
};
export type EducationType = {
  institution: string;
  links: link[];
  start_date: string;
  end_date: string;
  degree: string;
  grade: string;
};

export type Resume = {
  title: string;
  experience: Array<ExperienceType>;
  projects: Array<ProjectType>;
  education: Array<EducationType>;
  skills: string;
  achievements: string;
};

export interface personalInfo extends UserDocument {
  phone: string;
  links: link[];
  linkedIn: string;
  profileSummary: string;
}

export type User = {
  personalInfo: personalInfo;
  resumes: Array<Resume>;
};
