import axios from "axios";

const API_URL = 'http://localhost:7000/user/'


const getUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'profile', config)

    return response.data
}

const userService = {
    getUser,
}
export default userService