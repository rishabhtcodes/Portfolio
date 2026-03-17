import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { store } from '../store/portfolioStore.js';

const router = express.Router();

router.get('/', async (_request, response, next) => {
  try {
    const profile = await store.getProfile();
    return response.json(profile);
  } catch (error) {
    return next(error);
  }
});

router.put('/', requireAuth, async (request, response, next) => {
  try {
    const savedProfile = await store.upsertProfile(request.body);
    return response.json(savedProfile);
  } catch (error) {
    return next(error);
  }
});

export default router;
