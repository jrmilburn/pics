import { useEffect, useState } from "react"
import styles from './Users.module.css'
import User from "./User"

export default function Users({ handleSelect }) {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error('Error:', error));
    }, [])

    return (
        <div className={styles["message-users"]}>
            {users.map((user, index) => (
                <User key={index} user={user} onClick={handleSelect}/>
        ))}
        </div>
    )

}