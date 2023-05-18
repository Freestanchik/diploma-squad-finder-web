import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/slices/userSlice.js";
import {reset} from "../../store/slices/authSlice.js";
import "./profile.scss"
import Loading from "../../components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useSelector((state) => state.auth)


    const {user, isLoading, isError, message} = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        dispatch(getUser())
        return () => {
            dispatch(reset())
        }
    }, [token, isError, message, dispatch])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="user-profile">
            <div className="user-profile__container">
                <div className="user-profile__username">{user ? user.login : "user"}</div>
                <div className="user-profile__email">{user ?user.email : "email"}</div>
                <div className="user-profile__age">Age: 21</div>
            </div>
        </div>
    );
}

export default Profile