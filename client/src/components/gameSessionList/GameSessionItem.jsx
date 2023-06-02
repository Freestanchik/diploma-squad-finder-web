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
import UserInfo from "../userInfo/UserInfo.jsx";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import GameSessionForm from "../gameSessionForm/GameSessionForm.jsx";


const GameSessionItem = ({gameSession}) => {
    const dispatch = useDispatch()

    const [userModalIsOpen, setUserModalIsOpen] = useState(false);
    const [editModalIsOpen, seteditModalIsOpen] = useState(false);

    const {user, publicUser} = useSelector((state) => state.user)


    function openUserModal() {
        setUserModalIsOpen(true);
    }

    function openEditModal() {
        seteditModalIsOpen(true);
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
            <Modal active={editModalIsOpen} setActive={seteditModalIsOpen}>
                <h2>Редагування сесії</h2>
                <GameSessionForm gameSession={gameSession}/>
            </Modal>
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
                        <UserInfo user={publicUser}/>
                    )}
                </Modal>
                <div className="game-session__action-icons">
                    {user && user._id === owner._id && (
                        <>
                            <FontAwesomeIcon icon={faPen} className="btn-edit"
                                             onClick={() => {
                                                 openEditModal()
                                             }}/>
                            <FontAwesomeIcon icon={faWindowClose} className="btn-delete"
                                             onClick={() => {
                                                 dispatch(deleteGameSession(gameSession._id))
                                             }}/>
                        </>
                    )
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
                {gamePlatforms.length > 0 && (
                    <p className="game-platforms">
                        Доступні платформи: <span>{gamePlatforms.join(', ')}</span>
                    </p>
                )}
                <div className={"game-session__info_columns"}>
                    {skillLvl && (
                        <p className="skill-lvl">Мінімальний рівень гри:
                            <span>{skillLvl}</span>
                        </p>
                    )}
                    {requiredPlayers && (
                        <p className="required-players">
                            Необхідна кількість гравців:
                            <span>{requiredPlayers}</span>
                        </p>
                    )}
                </div>
                {additionalInfo && (
                    <p className="additional-info">Додаткова інформація:
                        <span>{additionalInfo}</span>
                    </p>
                )}
                <div className={"game-session__info_columns"}>
                    {sessionDate && (
                        <p className="session-date">
                            Дата проведення: <span>{sessionDate.substring(0, 10)}</span>
                        </p>
                    )}
                    {timeStart && timeEnd && (
                        <p className="session-time">
                            Час проведення: <span>{timeStart} - {timeEnd}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameSessionItem;