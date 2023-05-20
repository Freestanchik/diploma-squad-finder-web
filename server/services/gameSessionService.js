import gameSessionRepository from "../repositories/gameSessionRepository.js";

const gameSessionService = {
    getAllSessions: async (searchParams, currentPage) => {
        const { gameName, gamePlatforms, minSkillLevel, maxRequiredPlayers } = searchParams;
        const PAGE_SIZE = 10;

        const skip = (currentPage - 1) * PAGE_SIZE;

        let gameSessions = [];
        const query = {};

        if (gameName) {
            query.gameName = gameName;
        }

        if (gamePlatforms && gamePlatforms.length > 0) {
            query.gamePlatforms = { $in: gamePlatforms };
        }

        if (minSkillLevel && minSkillLevel > 0) {
            query.skillLvl = { $gte: minSkillLevel };
        }

        if (maxRequiredPlayers && maxRequiredPlayers > 0) {
            query.requiredPlayers = { $lte: maxRequiredPlayers };
        }

        const totalGameSessions = await gameSessionRepository.countDocuments(query);
        const totalPages = Math.ceil(totalGameSessions / PAGE_SIZE);

        gameSessions = await gameSessionRepository.find(query, skip, PAGE_SIZE);

        return { gameSessions, totalPages };
    },

    getUserSessions: async (userId) => {
        return gameSessionRepository.findByOwner(userId);
    },

    getUserParticipantSessions: async (userId) => {
        return gameSessionRepository.findByParticipant(userId);
    },

    addGameSession: async (ownerId, gameSessionData) => {
        const gameSession = await gameSessionRepository.createGameSession(ownerId, gameSessionData);

        const populatedGameSession = await gameSessionRepository.findByIdWithPopulate(gameSession._id);

        return populatedGameSession;
    },

    deleteGameSession: async (gameSessionId, ownerId) => {
        const gameSession = await gameSessionRepository.findById(gameSessionId);

        if (!gameSession) {
            throw new Error('Game session not found');
        }

        if (gameSession.owner.toString() !== ownerId) {
            throw new Error('Authorized user is not the owner');
        }

        await gameSessionRepository.deleteGameSession(gameSessionId);

        return { id: gameSessionId };
    },

    addParticipant: async (gameSessionId, userId) => {
        const gameSession = await gameSessionRepository.findById(gameSessionId);

        if (!gameSession) {
            throw new Error('Game session not found');
        }

        if (gameSession.owner.toString() === userId) {
            throw new Error('You cannot join your own game session');
        }

        if (gameSession.participants.includes(userId)) {
            throw new Error('User already joined this game session');
        }

        await gameSessionRepository.addParticipant(gameSessionId, userId);

        const updatedGameSession = await gameSessionRepository.findByIdWithPopulate(gameSessionId);

        return updatedGameSession;
    },

    deleteParticipant: async (gameSessionId, userId) => {
        const gameSession = await gameSessionRepository.findById(gameSessionId);

        if (gameSession.owner.toString() === userId || gameSession.participants.includes(userId)) {
            await gameSessionRepository.deleteParticipant(gameSessionId, userId);
        } else {
            throw new Error('User not found');
        }

        const updatedGameSession = await gameSessionRepository.findByIdWithPopulate(gameSessionId);

        return updatedGameSession;
    },
};

export default gameSessionService;