import bcrypt from 'bcryptjs';
import { store } from '../store/portfolioStore.js';
import {
  seedAchievements,
  seedCertificates,
  seedProfile,
  seedProjects,
  seedSkills,
} from './seedData.js';

export async function bootstrapDatabase() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be defined in backend environment variables.');
  }

  const existingAdmin = await store.findUserByEmail(adminEmail.toLowerCase());

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await store.createUser({ email: adminEmail.toLowerCase(), passwordHash, role: 'admin' });
  }

  if ((await store.countProfile()) === 0) {
    await store.upsertProfile(seedProfile);
  }

  if ((await store.countProjects()) === 0) {
    await store.seedProjects(seedProjects);
  }

  if ((await store.countSkills()) === 0) {
    await store.seedSkills(seedSkills);
  }

  if ((await store.countAchievements()) === 0) {
    await store.seedAchievements(seedAchievements);
  }

  if ((await store.countCertificates()) === 0) {
    await store.seedCertificates(seedCertificates);
  }
}
