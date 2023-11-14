import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export default User;
