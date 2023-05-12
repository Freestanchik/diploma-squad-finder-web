import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import UserModel from "../models/userModel.js";
import {generateJWT} from "../helpers/index.js";

export const registerUser = asyncHandler(async (req, res) => {
    const {login, email, password} = req.body

    if (!login || !email || !password) {
        res.status(400)
        throw new Error('Add all required fields')
    }

    const user = await UserModel.findOne({email})

    if (user) {
        res.status(400)
        throw new Error('User already exists')
    }


    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await UserModel.create({
        login,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            token: generateJWT(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Add all required fields')
    }

    const user = await UserModel.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            login: user.login,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})







