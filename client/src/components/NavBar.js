import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const auth = useContext(AuthContext);

    return (
        <nav style={{padding: '0 15px'}}>
            <div className="nav-wrapper" >
                <a href="#" className="brand-logo">MERN</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">create</NavLink></li>
                    <li><NavLink to="/links">links</NavLink></li>
                    <button className="btn black lighten-2 white-text" onClick={() => auth.logout()}>Logout</button>
                </ul>
            </div>
        </nav>
    )
};

export default NavBar;