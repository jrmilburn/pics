import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import styles from './MessagePage.module.css';
import { NavLink } from "react-router-dom";
import Users from "../components/Users/Users";
import ChatMessages from '../components/ChatMessages/ChatMessages'; 


export default function MessagePage() {

    const { currentUser, logout } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);

    const handleUserClick = (user) => {
        setSelectedChat(user);
    }

    return (
        <div className={styles["dashboard"]}>
            <div className={styles["chat-nav"]}>
                 <Users handleSelect={handleUserClick}/>
            </div>
            <div className={styles["chat"]}>
                {selectedChat ? (
                    <ChatMessages currentUser={currentUser} selectedUser={selectedChat}/>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    )
}