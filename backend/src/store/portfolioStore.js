import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Achievement } from '../models/Achievement.js';
import { Certificate } from '../models/Certificate.js';
import { getStorageMode } from './storageMode.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '..', '..', 'data');
const dataFilePath = path.join(dataDir, 'local-db.json');
const defaultDb = {
  users: [],
  profile: null,
  projects: [],
  skills: [],
  achievements: [],
  certificates: [],
};

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultDb, null, 2));
  }
}

function readLocalDb() {
  ensureDataFile();
  const raw = fs.readFileSync(dataFilePath, 'utf8');
  const parsed = JSON.parse(raw || '{}');
  return { ...defaultDb, ...parsed };
}

function writeLocalDb(db) {
  ensureDataFile();
  fs.writeFileSync(dataFilePath, JSON.stringify(db, null, 2));
}

function makeId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeMongoRecord(record) {
  if (!record) {
    return record;
  }

  const plainRecord = typeof record.toObject === 'function' ? record.toObject() : record;
  return {
    ...plainRecord,
    _id: plainRecord._id?.toString?.() || plainRecord._id || plainRecord.id,
  };
}

function sortByOrderThenCreated(items) {
  return [...items].sort((left, right) => {
    const leftOrder = Number(left.order || 0);
    const rightOrder = Number(right.order || 0);
    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    const leftCreated = new Date(left.createdAt || 0).getTime();
    const rightCreated = new Date(right.createdAt || 0).getTime();
    return rightCreated - leftCreated;
  });
}

function stampNewRecord(payload) {
  const timestamp = new Date().toISOString();
  return {
    ...payload,
    _id: makeId(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function updateStampedRecord(existing, payload) {
  return {
    ...existing,
    ...payload,
    _id: existing._id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

export async function findUserByEmail(email) {
  if (getStorageMode() === 'mongo') {
    return User.findOne({ email }).lean();
  }

  const db = readLocalDb();
  return db.users.find((user) => user.email === email) || null;
}

export async function createUser(payload) {
  if (getStorageMode() === 'mongo') {
    const created = await User.create(payload);
    return normalizeMongoRecord(created);
  }

  const db = readLocalDb();
  const created = stampNewRecord(payload);
  db.users.push(created);
  writeLocalDb(db);
  return created;
}

export async function getProfile() {
  if (getStorageMode() === 'mongo') {
    const profile = await Profile.findOne().sort({ createdAt: 1 }).lean();
    return profile ? normalizeMongoRecord(profile) : null;
  }

  const db = readLocalDb();
  return db.profile;
}

export async function upsertProfile(payload) {
  if (getStorageMode() === 'mongo') {
    const existing = await Profile.findOne().sort({ createdAt: 1 });

    if (!existing) {
      const created = await Profile.create(payload);
      return normalizeMongoRecord(created);
    }

    existing.set(payload);
    await existing.save();
    return normalizeMongoRecord(existing);
  }

  const db = readLocalDb();
  db.profile = db.profile ? updateStampedRecord(db.profile, payload) : stampNewRecord(payload);
  writeLocalDb(db);
  return db.profile;
}

async function listCollection(collectionKey, mongoModel) {
  if (getStorageMode() === 'mongo') {
    const records = await mongoModel.find().sort({ order: 1, createdAt: -1 }).lean();
    return records.map(normalizeMongoRecord);
  }

  const db = readLocalDb();
  return sortByOrderThenCreated(db[collectionKey]);
}

async function createCollectionItem(collectionKey, mongoModel, payload) {
  if (getStorageMode() === 'mongo') {
    const created = await mongoModel.create(payload);
    return normalizeMongoRecord(created);
  }

  const db = readLocalDb();
  const created = stampNewRecord(payload);
  db[collectionKey].push(created);
  writeLocalDb(db);
  return created;
}

async function updateCollectionItem(collectionKey, mongoModel, id, payload) {
  if (getStorageMode() === 'mongo') {
    const updated = await mongoModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    return updated ? normalizeMongoRecord(updated) : null;
  }

  const db = readLocalDb();
  const index = db[collectionKey].findIndex((item) => item._id === id);
  if (index === -1) {
    return null;
  }

  db[collectionKey][index] = updateStampedRecord(db[collectionKey][index], payload);
  writeLocalDb(db);
  return db[collectionKey][index];
}

async function deleteCollectionItem(collectionKey, mongoModel, id) {
  if (getStorageMode() === 'mongo') {
    await mongoModel.findByIdAndDelete(id);
    return;
  }

  const db = readLocalDb();
  db[collectionKey] = db[collectionKey].filter((item) => item._id !== id);
  writeLocalDb(db);
}

async function countCollection(collectionKey, mongoModel) {
  if (getStorageMode() === 'mongo') {
    return mongoModel.countDocuments();
  }

  const db = readLocalDb();
  if (collectionKey === 'profile') {
    return db.profile ? 1 : 0;
  }
  return db[collectionKey].length;
}

async function seedCollection(collectionKey, mongoModel, items) {
  if (getStorageMode() === 'mongo') {
    await mongoModel.insertMany(items);
    return;
  }

  const db = readLocalDb();
  db[collectionKey] = items.map((item) => stampNewRecord(item));
  writeLocalDb(db);
}

export const store = {
  findUserByEmail,
  createUser,
  getProfile,
  upsertProfile,
  listProjects: () => listCollection('projects', Project),
  createProject: (payload) => createCollectionItem('projects', Project, payload),
  updateProject: (id, payload) => updateCollectionItem('projects', Project, id, payload),
  deleteProject: (id) => deleteCollectionItem('projects', Project, id),
  listSkills: () => listCollection('skills', Skill),
  createSkill: (payload) => createCollectionItem('skills', Skill, payload),
  updateSkill: (id, payload) => updateCollectionItem('skills', Skill, id, payload),
  deleteSkill: (id) => deleteCollectionItem('skills', Skill, id),
  listAchievements: () => listCollection('achievements', Achievement),
  createAchievement: (payload) => createCollectionItem('achievements', Achievement, payload),
  updateAchievement: (id, payload) => updateCollectionItem('achievements', Achievement, id, payload),
  deleteAchievement: (id) => deleteCollectionItem('achievements', Achievement, id),
  listCertificates: () => listCollection('certificates', Certificate),
  createCertificate: (payload) => createCollectionItem('certificates', Certificate, payload),
  updateCertificate: (id, payload) => updateCollectionItem('certificates', Certificate, id, payload),
  deleteCertificate: (id) => deleteCollectionItem('certificates', Certificate, id),
  countUsers: () => countCollection('users', User),
  countProfile: () => countCollection('profile', Profile),
  countProjects: () => countCollection('projects', Project),
  countSkills: () => countCollection('skills', Skill),
  countAchievements: () => countCollection('achievements', Achievement),
  countCertificates: () => countCollection('certificates', Certificate),
  seedProjects: (items) => seedCollection('projects', Project, items),
  seedSkills: (items) => seedCollection('skills', Skill, items),
  seedAchievements: (items) => seedCollection('achievements', Achievement, items),
  seedCertificates: (items) => seedCollection('certificates', Certificate, items),
};
