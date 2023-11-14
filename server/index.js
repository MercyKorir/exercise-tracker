import express from 'express';
import cors from 'cors';
import './config/loadEnvironment.js';
import { connectToDB } from './db/conn.js';
import users from './routes/user.js';
import exercises from './routes/exercise.js';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/user', users);
app.use('/exercise', exercises);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
