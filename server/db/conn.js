import mongoose from 'mongoose';

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  throw new Error('Invalid Environment variable');
}

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

export const connectToDB = async () => {
  try {
    await mongoose.connect(ATLAS_URI, {
      dbName: 'exercise-tracker',
    });
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};
