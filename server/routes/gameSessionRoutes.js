import express from "express";
import {
    addGameSession, deleteGameSession, deleteJoinRequest,
    getAllSessions,
    getUserSessions,
    makeJoinRequest
} from "../controllers/gameSessionController.js";
import isAuthorized from "../middlewares/authMiddleware.js";

const gameSessionRouter = express.Router();

gameSessionRouter.get('/gameSessions', getAllSessions);
gameSessionRouter.post('/RequestSession', isAuthorized, makeJoinRequest);
gameSessionRouter.post('/deleteRequestSession', isAuthorized, deleteJoinRequest);

gameSessionRouter.route('/UserGameSessions').get(isAuthorized, getUserSessions).post(isAuthorized, addGameSession)
gameSessionRouter.route('/UserGameSessions/:id').delete(isAuthorized, deleteGameSession)

gameSessionRouter.route('/requestSession').post(isAuthorized, makeJoinRequest).delete(isAuthorized, deleteJoinRequest)

export default gameSessionRouter