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

// Get exercise by id
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (error) {
    console.error('Error getting exercise', error);
    res.status(500).json({ message: 'Error getting exercise' });
  }
};

// Delete exercise by id
export const deleteExerciseById = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise', error);
    res.status(500).json({ message: 'Error deleting exercise' });
  }
};

// Update exercise by id using PATCH meaning only update the fields that are passed in
export const updateExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    const { username, description, duration } = req.body;
    const date = Date.parse(req.body.date);
    if (username) exercise.username = username;
    if (description) exercise.description = description;
    if (duration) exercise.duration = duration;
    if (date) exercise.date = date;
    await exercise.save();
    res.json({ message: 'Exercise updated successfully', exercise });
  } catch (error) {
    console.error('Error updating exercise', error);
    res.status(500).json({ message: 'Error updating exercise' });
  }
};
