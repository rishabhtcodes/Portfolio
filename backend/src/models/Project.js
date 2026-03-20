import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    github: { type: String, trim: true },
    demo: { type: String, trim: true },
    isLive: { type: Boolean, default: true },
    status: { type: String, default: 'Completed', trim: true },
    image: { type: String, trim: true },
    techStack: [{ type: String, trim: true }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Project = mongoose.model('Project', projectSchema);
