import "./gameSessionItem.scss"
import {useDispatch, useSelector} from "react-redux";
import {faArrowAltCircleRight, faWindowClose} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteGameSession} from "../../store/slices/gameSessionSlice.js";

const GameSessionItem = ({gameSession}) => {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.user)

    const {
        owner,
        gameName,
        gamePlatforms = [],
        skillLvl,
        requiredPlayers,
        sessionDate,
        timeStart,
        timeEnd,
        additionalInfo,
        userParticipants = [],
    } = gameSession;

    return (
        <div className="game-session">
            <div className="game-session__main">
                <div className="game-session__required-data">
                    <h2 className="game-name">Гра: {gameName}</h2>
                    <p className="owner">Автор: {owner && owner.login}</p>
                </div>
                <div className="game-session__action-icons">
                    {user && user._id === owner._id && (
                        <FontAwesomeIcon icon={faWindowClose} className="btn-delete"
                                         onClick={() => dispatch(deleteGameSession(gameSession._id))}/>)
                    }
                    {user && user._id !== owner._id && (
                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="btn-join"
                                         onClick={() => dispatch(deleteGameSession(gameSession._id))}/>)
                    }
                </div>

            </div>

            <div className="game-session__info">
                {gamePlatforms.length > 0 && (
                    <p className="game-platforms">
                        Platforms: {gamePlatforms.join(', ')}
                    </p>
                )}
                {skillLvl && (
                    <p className="skill-lvl">skill lvl: {skillLvl}</p>
                )}
                {requiredPlayers && (
                    <p className="required-players">Required Players: {requiredPlayers}</p>
                )}
                {sessionDate && (
                    <p className="session-date">
                        Session Date: {sessionDate}
                    </p>
                )}
                {timeStart && timeEnd && (
                    <p className="session-time">
                        Time: {timeStart} - {timeEnd}
                    </p>
                )}
                {additionalInfo && (
                    <p className="additional-info">Additional Info: {additionalInfo}</p>
                )}
                {userParticipants.length > 0 && (
                    <div className="user-participants">
                        <p>User Participants:</p>
                        <ul>
                            {userParticipants.map((userId) => (
                                <li key={userId}>{userId}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameSessionItem;