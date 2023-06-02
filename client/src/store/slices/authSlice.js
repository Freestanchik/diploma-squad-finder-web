import authService from "../../services/authService.js";

const currentToken = JSON.parse(localStorage.getItem('token'))
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: currentToken ? currentToken : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (e) {
            const message = (e.response.data.error)
            return thunkAPI.rejectWithValue(message)
        }
    })

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (e) {
            const message = (e.response.data.error)
            return thunkAPI.rejectWithValue(message)
        }
    })

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = ''
                state.token = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.token = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = ''
                state.token = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.token = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer