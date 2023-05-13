import express from "express";
import isAuthorized from "../middlewares/authMiddleware.js";
import {getCurrentUser} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get('/profile', isAuthorized, getCurrentUser);

export default userRouter
