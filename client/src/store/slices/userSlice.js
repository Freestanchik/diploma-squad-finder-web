import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from "../../services/userService.js";

const initialState = {
    user: null,
    publicUser: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            return await userService.getUser(token)
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

export const getUserPublicData = createAsyncThunk(
    'user/getUserPublicData',
    async (id, thunkAPI) => {
        try {
            return await userService.getUserPublicData(id)
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

export const editUser = createAsyncThunk(
    'user/editUser',
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token
            return await userService.editUser(token, userData)
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


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.rejected || getUserPublicData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getUserPublicData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.publicUser = action.payload
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
    },
})

export const {resetUser} = userSlice.actions
export default userSlice.reducer