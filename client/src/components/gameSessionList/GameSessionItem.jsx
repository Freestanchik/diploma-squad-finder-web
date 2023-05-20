import "./gameSessionItem.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight, faRectangleXmark,
    faWindowClose,
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteGameSession, deleteParticipant, joinGameSession} from "../../store/slices/gameSessionSlice.js";
import {getUserPublicData} from "../../store/slices/userSlice.js";
import React, {useState} from "react";
import Modal from "../modal/Modal.jsx";


const GameSessionItem = ({gameSession}) => {
    const dispatch = useDispatch()

    const [userModalIsOpen, setUserModalIsOpen] = useState(false);

    const {user, publicUser} = useSelector((state) => state.user)


    function openUserModal() {
        setUserModalIsOpen(true);
    }

    function hasUserWithId(participants, chosenId) {
        for (let i = 0; i < participants.length; i++) {
            if (participants[i]._id === chosenId) {
                return true;
            }
        }
        return false;
    }

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
        participants = [],
    } = gameSession;

    return (
        <div className="game-session">
            <div className="game-session__main">
                <div className="game-session__required-data">
                    <h2 className="game-name">Гра: {gameName}</h2>
                    <p className="owner">Автор:
                        <button onClick={() => {
                            openUserModal()
                            dispatch(getUserPublicData(owner._id))
                        }
                        }>
                            {owner && owner.login}
                        </button>
                    </p>
                </div>
                <Modal active={userModalIsOpen} setActive={setUserModalIsOpen}>
                    {publicUser && (
                        <div className="modal-form">
                            <p>Інформація про користувача</p>
                            <p>Логін: {publicUser.login}</p>
                            <p>Імейл: {publicUser.email}</p>
                        </div>
                    )
                    }
                </Modal>
                <div className="game-session__action-icons">
                    {user && user._id === owner._id && (
                        <FontAwesomeIcon icon={faWindowClose} className="btn-delete"
                                         onClick={() => {
                                             dispatch(deleteGameSession(gameSession._id))
                                         }}/>)
                    }
                    {user && user._id !== owner._id && !hasUserWithId(participants, user._id) && (
                        <button className="btn-join" onClick={() => dispatch(joinGameSession(gameSession._id))}>
                            <span> Приєднатися </span>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} className="icon-join"/>
                        </button>
                    )
                    }
                    {user && user._id !== owner._id && hasUserWithId(participants, user._id) && (
                        <button className="btn-leave" onClick={() => dispatch(deleteParticipant(
                            {gameSessionId: gameSession._id, userId: user._id}
                        ))}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="icon-leave"/>
                            <span> Покинути </span>
                        </button>)
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
                    <p className="skill-lvl">Рівень гри: {skillLvl}</p>
                )}
                {requiredPlayers && (
                    <p className="required-players">Необхідна кількість гравців: {requiredPlayers}</p>
                )}
                {sessionDate && (
                    <p className="session-date">
                        Дата проведення: {sessionDate}
                    </p>
                )}
                {timeStart && timeEnd && (
                    <p className="session-time">
                        Час: {timeStart} - {timeEnd}
                    </p>
                )}
                {additionalInfo && (
                    <p className="additional-info">Додаткова інформація: {additionalInfo}</p>
                )}
                {participants.length > 0 && (
                    <div className="user-participants">
                        <p>Учасники: </p>
                        {participants.map((userInfo) => (
                            <div className="participant" key={userInfo._id}>
                                <span className="participant-name" onClick={() => {
                                    openUserModal()
                                    dispatch(getUserPublicData(userInfo._id))
                                }}>
                                    {userInfo.login}
                                </span>
                                {user && user._id === owner._id &&
                                    (<FontAwesomeIcon icon={faRectangleXmark} className="btn-delete-participant"
                                                      onClick={() => dispatch(deleteParticipant({
                                                          gameSessionId: gameSession._id,
                                                          userId: userInfo._id
                                                      }))}/>)
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameSessionItem;