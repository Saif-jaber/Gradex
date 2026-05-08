import express from 'express';
import { signup, login, getUserID } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUserID', getUserID);

export default router;