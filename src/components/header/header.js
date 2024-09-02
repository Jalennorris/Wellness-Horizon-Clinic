import React, {  useState} from 'react';
import logo from '../../images/clinicLogo.jpg';
import { Link } from 'react-router-dom';
import './header.css';
import useUserStore from '../../Store/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const username = useUserStore((state) => state.username);
    const setUsername = useUserStore((state) => state.setUsername);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    console.log(username);




    const handleSignOut = () => {
        setUsername(localStorage.removeItem('username'));
        navigate('/login');
        window.location.reload();
       
    }

    const toggleDropdown = () => {
        setDropdown((prevState) => !prevState);  // Safer toggle logic
    }

    return (
        <div className="header-container">
            <Link to='/'>
                <img className="header-logo" src={logo} alt='Clinic Logo' />
            </Link>
            <h1 className="header-title">Wellness Horizons Clinic</h1>
            <div className='header-username-container'>
                {username && (
                    <>
                        <h3 className={`header-username ${!username ? 'hidden' : ''}`}>{username}</h3>
                        <FontAwesomeIcon
                            className={`header-dropdown-icon ${!username ? 'hidden' : ''}`}
                            icon={dropdown ? faCaretUp : faCaretDown}
                            onClick={toggleDropdown}
                        />
                        {dropdown && (
                            <ul className='header-dropdown-menu'>
                                <li className='header-dropdown-item' onClick={handleSignOut}>
                                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
                                </li>
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
