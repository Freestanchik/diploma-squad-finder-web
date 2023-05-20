import "./gameSessionList.scss"
import GameSessionItem from "./GameSessionItem.jsx";
import Loading from "../loading/Loading.jsx";
import React from "react";
import {useSelector} from "react-redux";

const GameSessionList = ({gameSessions}) => {

    const {isLoading} = useSelector((state) => state.gameSession)

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="game-sessions-list">
            {gameSessions.map((gameSession) => (
                <GameSessionItem key={gameSession._id} gameSession={gameSession}/>
            ))}
        </div>
    )
}

export default GameSessionList