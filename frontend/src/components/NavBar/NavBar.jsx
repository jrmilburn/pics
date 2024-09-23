import { Outlet, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import homeIcon from '../../assets/home.svg';
import searchIcon from '../../assets/search.svg';
import messageIcon from '../../assets/message.svg';
import createIcon from '../../assets/create.svg';
import Users from '../Users/Users';
import Avatar from '../Common/Avatar';
import SearchModal from './searchModal';
import CreateModal from '../Create/Create';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function NavBar({ messagePage, setMessagePage }) {

    const { currentUser, logout } = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState('/');
    const [searchVisible, setSearchVisible] = useState(false);
    const [createVisible, setCreateVisible] = useState(false);

    const openSearch = (e) => {
        e.preventDefault();
        setActiveLink('/search');
        setCreateVisible(false);
        setSearchVisible(true);
    }

    const openCreate = (e) => {
        e.preventDefault();
        setActiveLink('/create');
        setSearchVisible(false);
        setCreateVisible(true);
    }

    const handleNavLinkClick = (path) => {
        setActiveLink(path);
        if(path === '/message') {
            setMessagePage(true);
         } else {
            setMessagePage(false);
        }
    }

    const handleClose = () => {
        setSearchVisible(false);
        setCreateVisible(false);
    }

    return (
        <>

        {messagePage ? (
                        <div className={styles["main-chat"]}>
                        <div className={styles["nav-messages"]}>
                            <nav className={styles['icons']}>
                                <ul className={styles['main-nav']}>
                                    <li className={styles['main-nav-item']}>
                                        <h1>pics</h1>
                                    </li>
                                    <li className={styles['main-nav-item']}>
                                        <NavLink to="/" onClick={() => handleNavLinkClick('/')} ><img src={homeIcon} /><p className={activeLink === '/' ? styles.selected : '' }></p></NavLink>
                                    </li>
                                    <li className={styles['main-nav-item']}>
                                        <NavLink to="/" onClick={openSearch} ><img src={searchIcon} /><p className={activeLink === '/search' ? styles.selected : '' }></p></NavLink>
                                    </li>
                                    <li className={styles['main-nav-item']}>
                                        <NavLink to="/message" onClick={() => handleNavLinkClick('/message')} ><img src={messageIcon} /><p className={activeLink === '/message' ? styles.selected : '' }></p></NavLink>
                                    </li>
                                    <li className={styles['main-nav-item']}>
                                        <NavLink to={`/profile/${currentUser.user.id}`} onClick={() => handleNavLinkClick('/profile')} ><Avatar username={currentUser.user.username} /><p className={activeLink === '/profile' ? styles.selected : '' }></p></NavLink>
                                    </li>
                                    <li className={styles['main-nav-item']}>
                                        <NavLink to="/" onClick={openCreate} ><img src={createIcon} /><p className={activeLink === '/create' ? styles.selected : '' }></p></NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className={styles["outlet"]}>
                            <Outlet />
                        </div>
                        </div>
        ) : (
            <div className={styles["main"]}>
                <div className={styles["nav"]}>
                    <nav>
                        <ul className={styles['main-nav']}>
                            <li className={styles['main-nav-item']}>
                                <h1>pics</h1>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <NavLink to="/" onClick={() => handleNavLinkClick('/')} ><img src={homeIcon} /><p className={activeLink === '/' ? styles.selected : '' }>Home</p></NavLink>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <NavLink to="/" onClick={openSearch} ><img src={searchIcon} /><p className={activeLink === '/search' ? styles.selected : '' }>Search</p></NavLink>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <NavLink to="/message" onClick={() => handleNavLinkClick('/message')} ><img src={messageIcon} /><p className={activeLink === '/message' ? styles.selected : '' }>Messages</p></NavLink>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <NavLink to={`/profile/${currentUser.user.id}`} onClick={() => handleNavLinkClick('/profile')} ><Avatar username={currentUser.user.username}/><p className={activeLink === '/profile' ? styles.selected : '' }>Profile</p></NavLink>
                            </li>
                            <li className={styles['main-nav-item']}>
                                <NavLink to="/" onClick={openCreate} ><img src={createIcon} /><p className={activeLink === '/create' ? styles.selected : '' }>Create</p></NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles["outlet"]}>
                    <Outlet />
                </div>
                </div>
        )}

        <SearchModal visible={searchVisible} onClose={handleClose} currentUser={currentUser}/>
        <CreateModal visible={createVisible} onClose={handleClose} currentUser={currentUser}/>
            
        </>
    );

}