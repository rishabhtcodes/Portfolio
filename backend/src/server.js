import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import { bootstrapDatabase } from './utils/bootstrap.js';
import adminRoutes from './routes/adminRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import achievementsRoutes from './routes/achievementsRoutes.js';
import certificatesRoutes from './routes/certificatesRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((item) => item.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      // Also strictly allow local development patterns if not already in allowedOrigins
      if (!origin || 
          allowedOrigins.includes(origin) || 
          origin.startsWith('http://localhost:') || 
          origin.startsWith('http://127.0.0.1:')) {
        callback(null, true);
        return;
      }

      console.error(`CORS Error: Origin ${origin} is not in the allowed list:`, allowedOrigins);
      callback(new Error(`Origin ${origin} not allowed by CORS.`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '8mb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/contact', contactRoutes);

app.use((error, _request, response, _next) => {
  const statusCode = error.statusCode || error.status || (error.name === 'ValidationError' ? 400 : 500);
  const message = error.type === 'entity.too.large'
    ? 'Uploaded image is too large. Please choose a smaller image.'
    : (error.message || 'Unexpected server error.');
  response.status(statusCode).json({ message });
});

async function startServer() {
  const connection = await connectDatabase();
  await bootstrapDatabase();

  app.listen(port, () => {
    const suffix = connection.mode === 'mongo' ? 'using MongoDB.' : `using local JSON storage fallback. MongoDB unavailable: ${connection.reason}`;
    console.log(`Portfolio backend running on port ${port} ${suffix}`);

    // Self-ping to keep the free Render service awake
    // Render typically sleeps after 15 minutes of inactivity
    const pingInterval = 14 * 60 * 1000; // 14 minutes
    const backendUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
    
    setInterval(() => {
      fetch(`${backendUrl}/api/health`)
        .then((res) => {
          console.log(`[Keep-Alive] Pinged ${backendUrl}/api/health: ${res.status}`);
        })
        .catch((err) => {
          console.error(`[Keep-Alive] Ping failed:`, err.message);
        });
    }, pingInterval);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
