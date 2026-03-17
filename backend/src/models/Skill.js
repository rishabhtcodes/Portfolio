import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, default: 'General', trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Skill = mongoose.model('Skill', skillSchema);
