import logo from '../../assets/logo.png'
import './header.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../store/slices/authSlice.js";

const Header = () => {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header__logo'}>
                    <img className={'logo'} src={logo} alt="Squad finder web logo"/>
                    <p className={'app_name'}>SQUAD FINDER</p>
                </div>
                <div className={'header__user-info'}>
                    <div className={'user-info_left'}>
                        <p className={'user-name'}>{user ? user.login : "Гість"}</p>
                        <span className={'login-link'}>
                            {user
                                ? <button className="btn-logout" onClick={onLogout}>Вийти</button>
                                : <Link to="/login">Увійти</Link>
                            }
                        </span>
                    </div>
                    <span className={'profile-icon'}>
                        <Link to="/login">
                            <FontAwesomeIcon icon={faUser}/>
                        </Link>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;