import express from 'express';
import { register, checkAuth } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);
router.post('/register', register);

export default router;
