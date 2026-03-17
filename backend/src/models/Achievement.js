import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    year: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: 'trophy', trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Achievement = mongoose.model('Achievement', achievementSchema);
