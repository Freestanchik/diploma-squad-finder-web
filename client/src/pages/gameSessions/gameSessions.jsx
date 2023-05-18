import React, {useEffect} from "react";
import GameSessionList from "../../components/gameSessionList/GameSessionList.jsx";
import GameSessionForm from "../../components/gameSessionForm/GameSessionForm.jsx";
import "./gameSessions.scss"
import Modal from "../../components/modal/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllGameSessions, resetGameSessions} from "../../store/slices/gameSessionSlice.js";
import Loading from "../../components/loading/Loading.jsx";
import {faWindowClose} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";


const GameSessions = () => {

    const [formModalIsOpen, setFormIsOpen] = React.useState(false);
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {gameSessions, isLoading, isSuccess, isError, message} = useSelector((state) => state.gameSession)

    useEffect(() => {
        dispatch(getAllGameSessions())
    }, [isError, isSuccess, message, dispatch])
    if (isLoading) {
        return <Loading/>
    }


    function openFormModal() {
        if (!token) {
            navigate('/login')
        }
        setFormIsOpen(true);
    }

    function closeFormModal() {
        setFormIsOpen(false);
    }

    return (
        <div className={"game-session-page"}>
            <button className="btn-open-form" onClick={openFormModal}>Створити сесію</button>

            <Modal active={formModalIsOpen} setActive={setFormIsOpen}>
                <div className="modal-form">
                    <FontAwesomeIcon icon={faWindowClose} className="btn-close-modal"
                                     onClick={closeFormModal}>close</FontAwesomeIcon>
                    <GameSessionForm/>
                </div>
            </Modal>

            <GameSessionList gameSessions={gameSessions}/>
        </div>
    );
};

export default GameSessions