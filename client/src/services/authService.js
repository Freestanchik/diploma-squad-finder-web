import axios from 'axios'

const API_URL = 'http://localhost:7000/api/auth/'


const register = async (userData) => {
    const res = await axios.post(API_URL + 'register', userData)

    if (res.data) {
        localStorage.setItem('token', JSON.stringify(res.data))
    }

    return res.data
}

const login = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData)

    if (res.data) {
        localStorage.setItem('token', JSON.stringify(res.data))
    }

    return res.data
}

const logout = async () => {
    localStorage.removeItem('token')
}


const authService = {
    register,
    login,
    logout,
}

export default authService