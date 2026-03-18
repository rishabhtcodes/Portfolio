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

  const currentProfile = await store.getProfile();
  if (currentProfile) {
    const unsplashMatches = [
      'images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      'images.unsplash.com/photo-1527980965255-d3b416303d12'
    ];
    
    let needsUpdate = false;
    const updatedProfile = { ...currentProfile };

    if (unsplashMatches.some(m => currentProfile.profilePhoto?.includes(m))) {
      updatedProfile.profilePhoto = '';
      needsUpdate = true;
    }

    if (unsplashMatches.some(m => currentProfile.about?.photo?.includes(m))) {
      updatedProfile.about = { ...currentProfile.about, photo: '' };
      needsUpdate = true;
    }

    if (needsUpdate) {
      await store.upsertProfile(updatedProfile);
    }
  }

  if ((await store.countProjects()) === 0) {
    await store.seedProjects(seedProjects);
  }

  const allSkills = await store.listSkills();
  for (const skill of allSkills) {
    if (skill.name === 'VS Code' && skill.logo?.includes('simpleicons.org/visualstudiocode')) {
      await store.updateSkill(skill._id, {
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
      });
    }
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
