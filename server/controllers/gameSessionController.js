import gameSessionModel from "../models/gameSession.js"
import asyncHandler from "express-async-handler";

export const getAllSessions = asyncHandler(async (req, res) => {
    const gameSessions = await gameSessionModel.find().sort({ _id: -1 }).populate('owner', 'login')

    res.status(200).json(gameSessions)
})

export const getUserSessions = asyncHandler(async (req, res) => {
    const gameSessions = await gameSessionModel.find({owner: req.user.id}).sort({ _id: -1 }).populate('owner', 'login')

    res.status(200).json(gameSessions)
})
export const addGameSession = asyncHandler(async (req, res) => {
    const {
        gameName,
        gamePlatforms,
        skillLvl,
        requiredPlayers,
        sessionDate,
        timeStart,
        timeEnd,
        additionalInfo
    } = req.body
    if (!req.body.gameName) {
        res.status(400)
        throw new Error('Please add gameName')
    }

    const gameSession = await gameSessionModel.create({
        owner: req.user.id,
        gameName: gameName,
        gamePlatforms: gamePlatforms,
        skillLvl: skillLvl,
        requiredPlayers: requiredPlayers,
        sessionDate: sessionDate,
        timeStart: timeStart,
        timeEnd: timeEnd,
        additionalInfo: additionalInfo
    })

    res.status(200).json(gameSession)
})

export const deleteGameSession = asyncHandler(async (req, res) => {
    const {id} = req.params
    const gameSession = await gameSessionModel.findById(id)

    if (!gameSession) {
        res.status(401)
        throw new Error('Game session not found')
    }
    if (!req.user) {
        res.status(402)
        throw new Error('User not found')
    }
    if (gameSession.owner.toString() !== req.user.id) {
        res.status(403)
        throw new Error('Authorized user is not an owner')
    }

    await gameSessionModel.findByIdAndDelete(id)

    res.status(200).json({id: id})
})

export const makeJoinRequest = asyncHandler(async (req, res) => {
    const {gameSessionId} = req.body;


    const gameSession = await gameSessionModel.findById(gameSessionId);

    if (!gameSession) {
        res.status(401)
        throw new Error('GameSession not found')
    }

    if (gameSession.owner.toString() === req.user.id) {
        return res.status(403).json({error: 'You cannot join your own game session.'});
    }

    if (gameSession.userRequests.includes(req.user.id)) {
        return res.status(409).json({error: 'You have already requested to join this game session.'});
    }

    gameSession.userRequests.push(req.user.id);

    // Save the updated game session
    const updatedGameSession = await gameSession.save();

    res.status(200).json(updatedGameSession)
})

export const deleteJoinRequest = asyncHandler(async (req, res) => {
    const {gameSessionId, userId} = req.body;

    const gameSession = await gameSessionModel.findById(gameSessionId);

    if (gameSession.userRequests.includes(userId)) {
        gameSession.userRequests.splice(userId, 1);
    } else {
        return res.status(409).json({error: 'no user'});
    }

    // Save the updated game session
    const updatedGameSession = await gameSession.save();

    res.status(200).json(updatedGameSession)
})








