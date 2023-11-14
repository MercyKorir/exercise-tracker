import express from 'express';
import { signup, getUsers } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', signup);

export default router;
