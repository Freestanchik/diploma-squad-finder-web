import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

export const getUserPublicData = asyncHandler(async (req, res) => {
    const {id} = req.params

    const user = await userModel.findById(id).select('login email').exec();

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    res.status(200).json(user)
})
