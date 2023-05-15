import axios from "axios";

const getUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get("http://localhost:7000/user/profile", config)

    return response.data
}

const userService = {
    getUser,
}
export default userService