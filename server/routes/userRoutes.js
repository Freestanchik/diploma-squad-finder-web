import express from "express";
import isAuthorized from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get('/profile', isAuthorized, userController.getCurrentUser);
userRouter.get('/:id', userController.getUserPublicData);
export default userRouter
