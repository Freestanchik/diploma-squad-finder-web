import axios from "axios";

const API_URL = 'http://localhost:7000/api/user/'


const getUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'profile', config)

    return response.data
}

const getUserPublicData = async (id) => {

    const response = await axios.get(API_URL + id)

    return response.data
}

const userService = {
    getUser,
    getUserPublicData,
}
export default userService