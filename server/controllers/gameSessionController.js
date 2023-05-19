import gameSessionModel from "../models/gameSession.js"
import asyncHandler from "express-async-handler";

export const getAllSessions = asyncHandler(async (req, res) => {
    const gameSessions = await gameSessionModel.find().sort({_id: -1}).populate('owner', 'login').populate('participants', 'login')

    res.status(200).json(gameSessions)
})

export const getUserSessions = asyncHandler(async (req, res) => {
    const gameSessions = await gameSessionModel.find({owner: req.user.id}).sort({_id: -1}).populate('owner', 'login').populate('participants', 'login')

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
        additionalInfo: additionalInfo,
    })

    const loginGameSession = await gameSession.populate('owner', 'login')

    res.status(200).json(loginGameSession)
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

export const addParticipant = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const gameSession = await gameSessionModel.findById(id);

    if (!gameSession) {
        res.status(401)
        throw new Error('GameSession not found')
    }

    if (gameSession.owner.toString() === req.user.id) {
        return res.status(403).json({error: 'You cannot join your own game session.'});
    }

    if (gameSession.participants.includes(req.user.id)) {
        return res.status(409).json({error: 'User already joined to this game session.'});
    }

    gameSession.participants.push(req.user.id);

    // Save the updated game session
    await gameSession.save();
    const updatedGameSession = await gameSessionModel.findById(id).populate('owner', 'login').populate('participants', 'login');

    res.status(200).json(updatedGameSession)
})

export const deleteParticipant = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const gameSession = await gameSessionModel.findById(id);

    if ((gameSession.owner.toString() === req.user.id || req.body.id === req.user.id) && gameSession.participants.includes(req.body.id)) {
        gameSession.participants.splice(req.user.id, 1);
    } else {
        return res.status(409).json({error: 'no user'});
    }

    // Save the updated game session
    //const updatedGameSession = await gameSession.save().populate('owner', 'login').populate('participants', 'login');
    await gameSession.save();
    const updatedGameSession = await gameSessionModel.findById(id).populate('owner', 'login').populate('participants', 'login');
    res.status(200).json(updatedGameSession)
})








