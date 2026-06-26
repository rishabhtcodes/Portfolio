import express from 'express';
import { store } from '../store/portfolioStore.js';

const router = express.Router();

// ---------------------------------------------------------------------------
// In-memory cache — avoids hammering MongoDB on every page view.
// TTL: 60 seconds. The cache is invalidated whenever an admin write occurs
// (see invalidatePortfolioCache export used by write routes).
// ---------------------------------------------------------------------------
let cachedData = null;
let cacheExpiresAt = 0;
const CACHE_TTL_MS = 60_000; // 60 seconds

export function invalidatePortfolioCache() {
  cachedData = null;
  cacheExpiresAt = 0;
}

// GET /api/portfolio
// Returns all public portfolio data in a single response.
router.get('/', async (_request, response, next) => {
  try {
    const now = Date.now();

    // Serve from cache if still fresh
    if (cachedData && now < cacheExpiresAt) {
      response.setHeader('X-Cache', 'HIT');
      return response.json(cachedData);
    }

    // Fetch all collections in parallel — single MongoDB round-trip cost
    const [profile, projects, skills, achievements, certificates] = await Promise.all([
      store.getProfile(),
      store.listProjects(),
      store.listSkills(),
      store.listAchievements(),
      store.listCertificates(),
    ]);

    const payload = { profile, projects, skills, achievements, certificates };

    // Store in cache
    cachedData = payload;
    cacheExpiresAt = now + CACHE_TTL_MS;

    response.setHeader('X-Cache', 'MISS');
    return response.json(payload);
  } catch (error) {
    return next(error);
  }
});

export default router;
