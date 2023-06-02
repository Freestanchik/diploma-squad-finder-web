import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/slices/userSlice.js";
import {reset} from "../../store/slices/authSlice.js";
import Loading from "../../components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import "./Profile.scss";
import UserInfo from "../../components/userInfo/UserInfo.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import EditUserForm from "../../components/editUserForm/EditUserForm.jsx";
import Modal from "../../components/modal/Modal.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    const {user, isLoading, isSuccess, isError, message} = useSelector(
        (state) => state.user
    );

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);


    function openEditModal() {
        setEditModalIsOpen(true);
    }

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        dispatch(getUser());
        return () => {
            dispatch(reset());
        };
    }, [token, isError, message, dispatch]);

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="profile">
            <Modal active={editModalIsOpen} setActive={setEditModalIsOpen}>
                <EditUserForm userInfo={user}/>
            </Modal>
            <div className="btn-edit">
                Редагувати
                <FontAwesomeIcon icon={faPen}
                                 onClick={() => {
                                     openEditModal()
                                 }}/>
            </div>

            <UserInfo user={user}></UserInfo>
        </div>
    );
};

export default Profile;