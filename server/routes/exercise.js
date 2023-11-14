import express from 'express';
import {
  getExercises,
  createExercise,
} from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', getExercises);

router.post('/add', createExercise);

export default router;
