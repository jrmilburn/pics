import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import styles from './MessagePage.module.css';
import { NavLink } from "react-router-dom";

export default function ChatPage() {

    const { currentUser, logout } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);

    const handleLogout = () => {
        logout();
    }

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className={styles["dashboard"]}>
            <div className={styles["chat-nav"]}>

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