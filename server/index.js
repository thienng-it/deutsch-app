import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import contentRoutes from './routes/content.js';
import progressRoutes from './routes/progress.js';
import materialsRoutes from './routes/materials.js';

// Import database
import { initDatabase } from './database/init.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDatabase();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for local development
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500,
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// CORS configuration for local use
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Materials folder statically
const materialsPath = path.join(__dirname, '..', 'Materials');
app.use('/materials', express.static(materialsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/materials', materialsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Deutsch Learning App API is running' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Deutsch Learning App server running on http://localhost:${PORT}`);
  console.log(`📚 Materials path: ${materialsPath}`);
  console.log(`🔒 Max users: ${process.env.MAX_USERS}`);
});

export default app;
