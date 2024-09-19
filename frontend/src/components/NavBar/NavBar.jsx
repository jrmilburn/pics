import { Outlet, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import homeIcon from '../../assets/home.svg';
import searchIcon from '../../assets/search.svg';
import messageIcon from '../../assets/message.svg';
import createIcon from '../../assets/create.svg';

export default function NavBar({ messagePage, setMessagePage }) {

    const openSearch = (e) => {
        e.preventDefault();
        alert('Search is not implemented yet');
    }

    const openMessages = (e) => {
        setMessagePage(true);
    }

    const closeMessages = (e) => {
        setMessagePage(false);
    }

    return (
        <>

        {messagePage ? (
                        <div className={styles["main"]}>
                        <div className={styles["nav-messages"]}>
                            <nav>
                                <ul>
                                    <li>
                                        <h1>pics</h1>
                                    </li>
                                    <li>
                                        <NavLink to="/" onClick={closeMessages}><img src={homeIcon} /><p></p></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" onClick={openSearch}><img src={searchIcon} /><p></p></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/message" onClick={openMessages}><img src={messageIcon} /><p></p></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/profile" onClick={closeMessages}><p></p></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/create" onClick={closeMessages}><img src={createIcon} /><p></p></NavLink>
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
                        <ul>
                            <li>
                                <h1>pics</h1>
                            </li>
                            <li>
                                <NavLink to="/" onClick={closeMessages}><img src={homeIcon} /><p>Home</p></NavLink>
                            </li>
                            <li>
                                <NavLink to="/" onClick={openSearch}><img src={searchIcon} /><p>Search</p></NavLink>
                            </li>
                            <li>
                                <NavLink to="/message" onClick={openMessages}><img src={messageIcon} /><p>Messages</p></NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" onClick={closeMessages}><p>Profile</p></NavLink>
                            </li>
                            <li>
                                <NavLink to="/create" onClick={closeMessages}><img src={createIcon} /><p>Create</p></NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={styles["outlet"]}>
                    <Outlet />
                </div>
                </div>
        )}

            
        </>
    );

}