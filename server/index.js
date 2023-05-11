import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/authenticationRoutes.js'

// Load environment variables from a .env file
dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/auth', authRouter)
app.listen(PORT, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));


mongoose.Promise = Promise;
let DB_URL = process.env.DB_URL || ""

mongoose.connect(DB_URL).then(r => mongoose.Promise);

