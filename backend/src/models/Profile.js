import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    introduction: { type: String, required: true, trim: true },
    highlights: [{ type: String, trim: true }],
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    profilePhoto: { type: String, trim: true },
    about: {
      photo: { type: String, trim: true },
      summary: { type: String, trim: true },
      interests: { type: String, trim: true },
      description: { type: String, trim: true },
      techFocus: [{ type: String, trim: true }],
    },
    contact: {
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      linkedinLabel: { type: String, trim: true },
      github: { type: String, trim: true },
      githubLabel: { type: String, trim: true },
      copy: { type: String, trim: true },
    },
    resume: {
      title: { type: String, trim: true },
      highlights: [highlightSchema],
      resumeLink: { type: String, trim: true },
      resumePdfLink: { type: String, trim: true },
      resumeDocLink: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

export const Profile = mongoose.model('Profile', profileSchema);
