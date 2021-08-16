import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router as authRouter } from './routes/authorization';
import { router as articlesRouter } from "./routes/articles";
import { router as commentsRouter } from "./routes/comments";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);

const start = async () => {
  try {
    // @ts-ignore
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
      if (error) {
        return console.log(error);
      }
    });
    app.listen(port);
  } catch (e) {
    console.log(e);
  }
}

start();
