import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import GameSessionList from "../../components/gameSessionList/GameSessionList.jsx";
import Loading from "../../components/loading/Loading.jsx";
import {getUserGameSessions} from "../../store/slices/gameSessionSlice.js";


const UserGameSessions = () => {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {gameSessions, isLoading, isError, message} = useSelector((state) => state.gameSession)

    useEffect(() => {
        dispatch(getUserGameSessions())
        if(!token){
            navigate('/login')
        }

    }, [token, isError, message, dispatch])


    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
            <GameSessionList gameSessions={gameSessions}/>
        </>
    )
}

export default UserGameSessions