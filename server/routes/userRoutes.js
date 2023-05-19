import express from "express";
import isAuthorized from "../middlewares/authMiddleware.js";
import {getCurrentUser, getUserPublicData} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get('/profile', isAuthorized, getCurrentUser);
userRouter.get('/:id', getUserPublicData);
export default userRouter
