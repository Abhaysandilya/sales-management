import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/sales.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Retail Sales API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

