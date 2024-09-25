import { useEffect, useState } from "react"
import Friend from "./Friend"
import styles from './Friends.module.css'

export default function NotFriends({ currentUser, searchTerm, onClose }) {

    const [notFriends, setNotFriends] = useState([])

    useEffect(() => {
        fetch('https://pics-backend.onrender.com/follower', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            setNotFriends(data)
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }, [])

    return (
        <div className={styles["message-users"]}>
            {notFriends.map((user, index) => (
                <Friend key={index} user={user} currentUser={currentUser} searchTerm={searchTerm} onClose={onClose}/>
        ))}
        </div>
    )

}