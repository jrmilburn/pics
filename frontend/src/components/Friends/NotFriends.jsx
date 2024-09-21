import { useEffect, useState } from "react"
import Friend from "./Friend"
import styles from './Friends.module.css'

export default function NotFriends({ currentUser }) {

    const [notFriends, setNotFriends] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/follower', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
        })
        .then(response => response.json())
        .then(data => setNotFriends(data))
        .catch(error => console.error('Error:', error));
    }, [])

    const handleFollow = (user) => {
        fetch('http://localhost:3000/follower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username })
        })
        .then(response => response.json())
        .then(data => setNotFriends(data))
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className={styles["message-users"]}>
            {notFriends.map((user, index) => (
                <Friend key={index} user={user} onFollow={handleFollow}/>
        ))}
        </div>
    )

}