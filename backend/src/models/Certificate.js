import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, trim: true },
    credentialId: { type: String, trim: true },
    credentialLink: { type: String, trim: true },
    icon: { type: String, default: 'award', trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Certificate = mongoose.model('Certificate', certificateSchema);
