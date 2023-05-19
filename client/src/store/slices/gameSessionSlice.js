import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import gameSessionService from "../../services/gameSessionService.js";

const initialState = {
    gameSessions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllGameSessions = createAsyncThunk(
    'gameSessions/getAll',
    async (_, thunkAPI) => {
        try {
            return await gameSessionService.getAllGameSessions()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserGameSessions = createAsyncThunk(
    'gameSessions/getUserSessions',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
            console.log(token)
            return await gameSessionService.getUserGameSessions(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const createGameSession = createAsyncThunk(
    'gameSession/create',
    async (gameSessionData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
            return await gameSessionService.createGameSession(gameSessionData, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteGameSession = createAsyncThunk(
    'gameSession/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
            return await gameSessionService.deleteGameSession(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const joinGameSession = createAsyncThunk(
    'gameSession/join',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
            return await gameSessionService.joinGameSession(id, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteParticipant = createAsyncThunk(
    'gameSession/deleteParticipant',
    async ({gameSessionId, userId}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
            return await gameSessionService.deleteParticipant(gameSessionId, userId, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const gameSessionSlice = createSlice({
    name: 'gameSession',
    initialState,
    reducers: {
        resetGameSessions: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGameSessions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllGameSessions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameSessions = action.payload
            })
            .addCase(getAllGameSessions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserGameSessions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserGameSessions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameSessions = action.payload
            })
            .addCase(getUserGameSessions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createGameSession.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGameSession.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameSessions.unshift(action.payload)
            })
            .addCase(createGameSession.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGameSession.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gameSessions = state.gameSessions.filter(
                    (gameSession) => gameSession._id !== action.payload.id
                )
            })
            .addCase(deleteGameSession.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(joinGameSession.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const elemIndex = state.gameSessions.findIndex(item => item._id === action.payload._id)
                state.gameSessions[elemIndex] = action.payload
            })
            .addCase(joinGameSession.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteParticipant.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const elemIndex = state.gameSessions.findIndex(item => item._id === action.payload._id)
                state.gameSessions[elemIndex] = action.payload
            })
            .addCase(deleteParticipant.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    },
})

export const {resetGameSessions} = gameSessionSlice.actions
export default gameSessionSlice.reducer
