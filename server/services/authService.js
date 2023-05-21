import bcrypt from 'bcryptjs'
import {generateJWT} from "../helpers/index.js";
import userRepository from "../repositories/userRepository.js";

const authService = {
    registerUser: async (userData) => {
        const {login, email, password, discordNickname, sex, dateOfBirth, favouriteGenre, additionalInfo} = userData;

        if (!login || !email || !password || !discordNickname) {
            throw new Error('Add all required fields');
        }

        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userRepository.createUser(login, email, hashedPassword, discordNickname, sex, dateOfBirth, favouriteGenre, additionalInfo);

        if (!newUser) {
            throw new Error('Invalid user data');
        }

        return generateJWT(newUser._id);
    },

    loginUser: async (email, password) => {
        if (!email || !password) {
            throw new Error('Add all required fields');
        }

        const user = await userRepository.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid user data');
        }

        return generateJWT(user._id);
    },
};

export default authService;