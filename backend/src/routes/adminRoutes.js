import express from 'express';
import bcrypt from 'bcryptjs';
import { requireAuth, signAdminToken } from '../middleware/auth.js';
import { store } from '../store/portfolioStore.js';

const router = express.Router();

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await store.findUserByEmail(email.toLowerCase());

    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return response.status(401).json({ message: 'Invalid credentials.' });
    }

    return response.json({
      token: signAdminToken(user),
      user: { id: user._id || user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/dashboard', requireAuth, async (request, response) => {
  return response.json({
    message: 'Authenticated admin access granted.',
    user: request.user,
  });
});

export default router;
