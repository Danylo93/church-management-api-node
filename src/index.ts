// src/index.ts

import { PrismaClient } from '@prisma/client';
import express from 'express';
import userRoutes from './routes/userRoutes';
import cellReportRoutes from './routes/cellReportRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors'; // Use a importação correta
import eventRoutes from './routes/eventRoutes';
import memberRoutes from './routes/memberRoutes';


const prisma = new PrismaClient();
const app = express();

// Use o CORS de forma global ou apenas nas rotas específicas
app.use(cors()); // Aplica CORS globalmente
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Rotas de usuário
app.use('/api', userRoutes);

app.use('/api', eventRoutes);  // Usando as rotas de evento

app.use('/api', memberRoutes);  // Usando as rotas de evento

// Rotas de redes e células
app.use('/api', cellReportRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
