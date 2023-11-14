import express from 'express';
import cors from 'cors';
import './config/loadEnvironment.js';
import { connectToDB } from './db/conn.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
