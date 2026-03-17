import mongoose from 'mongoose';
import { setStorageMode } from '../store/storageMode.js';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    setStorageMode('json');
    return { mode: 'json', reason: 'MONGODB_URI is not defined.' };
  }

  try {
    await mongoose.connect(mongoUri);
    setStorageMode('mongo');
    return { mode: 'mongo' };
  } catch (error) {
    setStorageMode('json');
    return { mode: 'json', reason: error.message };
  }
}
