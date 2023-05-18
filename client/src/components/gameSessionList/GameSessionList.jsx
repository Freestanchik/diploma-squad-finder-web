import "./gameSessionList.scss"
import GameSessionItem from "./GameSessionItem.jsx";

const GameSessionList = ({gameSessions}) => {

    return (
        <div className="game-sessions-list">
            <h1>Game Sessions</h1>
            {gameSessions.map((gameSession) => (
                <GameSessionItem key={gameSession._id} gameSession={gameSession}/>
            ))}
        </div>
    )
}

export default GameSessionList