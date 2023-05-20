import userRepository from "../repositories/userRepository.js";

const userService = {
    getCurrentUser: async (user) => {
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },

    getUserPublicData: async (userId) => {
        const user = await userRepository.findById(userId, 'login email');

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    },
};

export default userService;