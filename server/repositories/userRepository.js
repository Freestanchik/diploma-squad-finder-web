import UserModel from "../models/userModel.js";

const userRepository = {
    findByEmail: async (email) => {
        return UserModel.findOne({email});
    },

    createUser: async (login, email, password, discordNickname, sex, dateOfBirth, favouriteGenre, additionalInfo) => {
        return UserModel.create({login, email, password, discordNickname, sex, dateOfBirth, favouriteGenre, additionalInfo});
    },

    findById: async (id, publicFields) => {
        return UserModel.findById(id).select(publicFields).exec();
    },
};

export default userRepository;