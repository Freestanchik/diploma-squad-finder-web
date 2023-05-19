import express from "express";
import {
    addGameSession, deleteGameSession,
    getAllSessions,
    getUserSessions,
    addParticipant, deleteParticipant
} from "../controllers/gameSessionController.js";
import isAuthorized from "../middlewares/authMiddleware.js";

const gameSessionRouter = express.Router();

gameSessionRouter.get('/gameSessions', getAllSessions);
gameSessionRouter.put('/joinSession/:id', isAuthorized, addParticipant);
gameSessionRouter.put('/deleteParticipant/:id', isAuthorized, deleteParticipant);

gameSessionRouter.route('/UserGameSessions').get(isAuthorized, getUserSessions).post(isAuthorized, addGameSession)
gameSessionRouter.route('/UserGameSessions/:id').delete(isAuthorized, deleteGameSession)

//gameSessionRouter.route('/requestSession').post(isAuthorized, addParticipant).delete(isAuthorized, deleteJoinRequest)

export default gameSessionRouter