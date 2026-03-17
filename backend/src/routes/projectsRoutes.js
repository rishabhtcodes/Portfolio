import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { store } from '../store/portfolioStore.js';

const router = express.Router();

router.get('/', async (_request, response, next) => {
  try {
    const items = await store.listProjects();
    return response.json(items);
  } catch (error) {
    return next(error);
  }
});

router.post('/', requireAuth, async (request, response, next) => {
  try {
    const created = await store.createProject(request.body);
    return response.status(201).json(created);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', requireAuth, async (request, response, next) => {
  try {
    const updated = await store.updateProject(request.params.id, request.body);
    return response.json(updated);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', requireAuth, async (request, response, next) => {
  try {
    await store.deleteProject(request.params.id);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
