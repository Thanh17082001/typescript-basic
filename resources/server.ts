import express, { Express } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router';
import connectToDB from './config/connectToDB';

dotenv.config()

const app : Express = express();
const port = process.env.PORT || 3004;

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// router
router(app)

// connect to db
connectToDB()


app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`);
});
