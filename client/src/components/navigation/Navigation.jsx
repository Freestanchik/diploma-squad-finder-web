import {NavLink} from "react-router-dom";
import './navigation.scss'

const Navigation = () => {
    return (
        <ul className={'main_navigation'}>
            <li>
                <NavLink to="/profile">Профіль</NavLink>
            </li>
            <li>
                <NavLink to="/">Ігрові сесії</NavLink>
            </li>
            <li>
                <NavLink to="/userSessions">Мої ігрові сесії</NavLink>
            </li>
        </ul>
    )
}

export default Navigation