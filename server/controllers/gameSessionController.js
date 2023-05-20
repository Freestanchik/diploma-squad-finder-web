import asyncHandler from 'express-async-handler';
import gameSessionService from "../services/gameSessionService.js";

export const getAllSessions = asyncHandler(async (req, res) => {
    const {searchParams, currentPage} = req.body;
    const {gameSessions, totalPages} = await gameSessionService.getAllSessions(searchParams, currentPage);

    res.status(200).json({gameSessions, totalPages});
});

export const getUserSessions = asyncHandler(async (req, res) => {
    const {id} = req.user;
    const gameSessions = await gameSessionService.getUserSessions(id);

    res.status(200).json(gameSessions);
});

export const getUserParticipantSessions = asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const gameSessions = await gameSessionService.getUserParticipantSessions(userId);

    res.status(200).json(gameSessions);
});

export const addGameSession = asyncHandler(async (req, res) => {
    const {id: ownerId} = req.user;
    const {
        gameName,
        gamePlatforms,
        skillLvl,
        requiredPlayers,
        sessionDate,
        timeStart,
        timeEnd,
        additionalInfo,
    } = req.body;

    if (!gameName) {
        res.status(400);
        throw new Error('Please add gameName');
    }

    const gameSessionData = {
        gameName,
        gamePlatforms,
        skillLvl,
        requiredPlayers,
        sessionDate,
        timeStart,
        timeEnd,
        additionalInfo,
    };

    const gameSession = await gameSessionService.addGameSession(ownerId, gameSessionData);

    res.status(200).json(gameSession);
});

export const deleteGameSession = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {id: ownerId} = req.user;

    const deletedGameSession = await gameSessionService.deleteGameSession(id, ownerId);

    res.status(200).json(deletedGameSession);
});

export const addParticipant = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;

    const updatedGameSession = await gameSessionService.addParticipant(id, userId);

    res.status(200).json(updatedGameSession);
});

export const deleteParticipant = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;

    const updatedGameSession = await gameSessionService.deleteParticipant(id, userId);

    res.status(200).json(updatedGameSession);
});

const gameSessionController = {
    getAllSessions,
    getUserSessions,
    getUserParticipantSessions,
    addGameSession,
    deleteGameSession,
    addParticipant,
    deleteParticipant,
};

export default gameSessionController;








