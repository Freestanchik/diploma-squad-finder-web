import logo from '../../assets/logo.png'
import './header.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-regular-svg-icons';

const Header = () => {
    return (
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header__logo'}>
                    <img className={'logo'} src={logo} alt="Squad finder web logo"/>
                    <p className={'app_name'}>SQUAD FINDER</p>
                </div>
                <div className={'header__user-info'}>
                    <div className={'user-info_left'}>
                        <p className={'user-name'}>Oleksandr Bihun</p>
                        <span className={'login-link'}></span>
                    </div>
                    <span className={'profile-icon'}>
                        <FontAwesomeIcon icon={faUser}/>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;