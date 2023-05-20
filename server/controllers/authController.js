import asyncHandler from 'express-async-handler'
import authService from "../services/authService.js";

const registerUser = asyncHandler(async (req, res) => {
    const {login, email, password} = req.body;

    try {
        const token = await authService.registerUser(login, email, password);
        res.status(201).json(token);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.json(token);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

const authController = {
    registerUser,
    loginUser,
};

export default authController


