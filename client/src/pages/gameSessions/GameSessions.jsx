import React, {useEffect} from "react";
import GameSessionList from "../../components/gameSessionList/GameSessionList.jsx";
import GameSessionForm from "../../components/gameSessionForm/GameSessionForm.jsx";
import "./gameSessions.scss"
import Modal from "../../components/modal/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllGameSessions} from "../../store/slices/gameSessionSlice.js";
import {faWindowClose} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchParamsForm from "../../components/searchParamsForm/SearchParamsForm.jsx";
import PageSelector from "../../components/pageSelector/PageSelector.jsx";


const GameSessions = () => {

    const [formModalIsOpen, setFormIsOpen] = React.useState(false);
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        gameSessions,
        currentPage,
        totalPages,
        searchFilters,
        isSuccess,
        isError,
        message
    } = useSelector((state) => state.gameSession)

    useEffect(() => {
        dispatch(getAllGameSessions({searchParams: searchFilters, currentPage: currentPage}))
    }, [isError, isSuccess, currentPage, searchFilters, message, dispatch])

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
            <button className="btn-open-form" onClick={openFormModal}>
                Створити сесію
            </button>

            <Modal active={formModalIsOpen} setActive={setFormIsOpen}>
                <div className="modal-form">
                    <FontAwesomeIcon icon={faWindowClose} className="btn-close-modal"
                                     onClick={closeFormModal}>close
                    </FontAwesomeIcon>
                    <h2>Створення сесії</h2>
                    <GameSessionForm gameSession={null}/>
                </div>
            </Modal>
            <div className={"game-sessions__main"}>
                <SearchParamsForm/>
                <GameSessionList gameSessions={gameSessions}/>
            </div>

            {totalPages > 1 && (<PageSelector/>)}

        </div>
    );
};

export default GameSessions