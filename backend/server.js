import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import testRoutes from './routes/testRoutes.js';
import modelRoutes from './routes/modelRoutes.js';

app.use('/api', testRoutes);
app.use('/api/models', modelRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send({ message: 'ANE API is running...' });
});

app.get('/api/health', (req, res) => {
    res.send({
        status: 'ok',
        has_token: !!process.env.THINGIVERSE_TOKEN,
        token_prefix: process.env.THINGIVERSE_TOKEN ? process.env.THINGIVERSE_TOKEN.substring(0, 4) : 'none'
    });
});

// Start Server
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

export default app;
