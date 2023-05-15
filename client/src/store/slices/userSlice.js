import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from "../../services/userService.js";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token.token
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer