import axios from "axios";

const API_URL = 'http://localhost:7000/gameSessions/'
const getAllGameSessions = async () => {
    const response = await axios.get(API_URL + 'gameSessions')
    return response.data
}

const getUserGameSessions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'UserGameSessions', config)

    return response.data
}

const createGameSession = async (gameSessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL + 'UserGameSessions', gameSessionData, config)

    return response.data
}

const deleteGameSession = async (gameSessionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    console.log(gameSessionId)

    const response = await axios.delete(API_URL + 'UserGameSessions/'+gameSessionId, config)

    return response.data
}

const gameSessionService = {
    getAllGameSessions,
    getUserGameSessions,
    createGameSession,
    deleteGameSession
}

export default gameSessionService