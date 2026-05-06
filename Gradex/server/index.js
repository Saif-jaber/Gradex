import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import semestersRoutes from './routes/semesters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// authenticating routes 
app.use('/auth', authRoutes);

// courses routes
app.use('/courses', coursesRoutes);

// semesters routes
app.use('/semesters', semestersRoutes);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));