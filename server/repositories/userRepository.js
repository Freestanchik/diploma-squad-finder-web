import UserModel from "../models/userModel.js";

const userRepository = {
    findByEmail: async (email) => {
        return UserModel.findOne({email});
    },

    createUser: async (login, email, password) => {
        return UserModel.create({login, email, password});
    },

    findById: async (id, publicFields) => {
        return UserModel.findById(id).select(publicFields).exec();
    },
};

export default userRepository;