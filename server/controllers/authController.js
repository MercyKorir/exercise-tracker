import User from '../models/UserModel.js';

// Create a new user
export const signup = async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username });
    const savedUser = await newUser.save();
    res.status(200).json({ message: 'User added successfully', savedUser });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users', error);
    res.status(500).json({ message: 'Error getting users' });
  }
};
