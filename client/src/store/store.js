import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import userReducer from "./slices/userSlice.js";
import gameSessionReducer from "./slices/gameSessionSlice.js"

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            user: userReducer,
            gameSession: gameSessionReducer,
        }
    }
)