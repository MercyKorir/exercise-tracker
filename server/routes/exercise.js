import express from 'express';
import {
  getExercises,
  createExercise,
  getExerciseById,
  deleteExerciseById,
  updateExerciseById,
} from '../controllers/exerciseController.js';

const router = express.Router();

router.get('/', getExercises);

router.post('/add', createExercise);

router.get('/:id', getExerciseById);

router.delete('/:id', deleteExerciseById);

router.patch('/:id', updateExerciseById);

export default router;
