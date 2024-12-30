import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running at ${PORT}`);
});
