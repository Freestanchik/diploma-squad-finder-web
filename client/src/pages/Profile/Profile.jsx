import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/slices/userSlice.js";
import {reset} from "../../store/slices/authSlice.js";
import Loading from "../../components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import "./Profile.scss";
import UserInfo from "../../components/userInfo/UserInfo.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    const {user, isLoading, isError, message} = useSelector(
        (state) => state.user
    );

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
                <UserInfo user={user}></UserInfo>
        </div>
    );
};

export default Profile;