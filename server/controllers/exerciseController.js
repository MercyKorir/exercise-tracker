import Exercise from '../models/ExerciseModel.js';
import User from '../models/UserModel.js';

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error('Error getting exercises', error);
    res.status(500).json({ message: 'Error getting exercises' });
  }
};

// @desc   Create an exercise
// @route  POST /api/exercises
// @access Public
export const createExercise = async (req, res) => {
  const { username, description, duration } = req.body;
  const date = Date.parse(req.body.date);
  try {
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });
    const savedExercise = await newExercise.save();
    res
      .status(201)
      .json({ message: 'Exercise added successfully', savedExercise });
  } catch (error) {
    console.error('Error creating exercise', error);
    res.status(500).json({ message: 'Error creating exercise' });
  }
};
