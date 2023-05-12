import express from 'express'
const authRouter = express.Router();
import {loginUser, registerUser} from "../controllers/authController.js";

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
export default authRouter