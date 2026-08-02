import mongoose from 'mongoose';
import { setStorageMode } from '../store/storageMode.js';

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not set. Cannot start without a database.');
  }

  console.log('Connecting to MongoDB...');

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 2500,
    socketTimeoutMS: 15000,
    connectTimeoutMS: 2500,
    maxPoolSize: 10,
    retryWrites: true,
  });


  setStorageMode('mongo');

  mongoose.connection.on('disconnected', () => {
    console.error('[MongoDB] Disconnected from database!');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[MongoDB] Connection error:', err.message);
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[MongoDB] Reconnected to database.');
  });

  return { mode: 'mongo' };
}
