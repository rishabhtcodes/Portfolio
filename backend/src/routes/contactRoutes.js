import express from 'express';
import { sendContactEmails } from '../utils/mailer.js';

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/send', async (request, response, next) => {
  try {
    const { name, email, message } = request.body;

    if (!name?.trim()) {
      return response.status(400).json({ message: 'Name is required.' });
    }

    if (!emailPattern.test(String(email || ''))) {
      return response.status(400).json({ message: 'A valid email is required.' });
    }

    if (!message || String(message).trim().length < 10) {
      return response.status(400).json({ message: 'Message must be at least 10 characters.' });
    }

    await sendContactEmails({
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
    });

    return response.json({ message: 'Message sent successfully.' });
  } catch (error) {
    return next(error);
  }
});

export default router;
