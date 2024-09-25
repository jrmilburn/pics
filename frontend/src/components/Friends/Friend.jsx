import React from 'react';
import styles from './Friend.module.css';
import Avatar from '../Common/Avatar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Friend({ user, currentUser, searchTerm, onClose }) {

    const navigate = useNavigate();
    const [userFollowing, setUserFollowing] = useState(user.followers);

    if(!user.username.includes(searchTerm)) return null;

    const onFollow = (user) => {
        
        setUserFollowing([...userFollowing, { toUserId: user.id, fromUserId: currentUser.user.id }]);

        fetch('https://pics-backend.onrender.com/follower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({ id: user.id })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

    const onUnfollow = (user) => {
            
            setUserFollowing(userFollowing.filter(follow => follow.toUserId !== user.id));
    
            fetch(`https://pics-backend.onrender.com/follower/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    const viewProfile = () => {
        
        onClose();
        navigate(`/profile/${user.id}`);

    }

    return (
        <div className={styles.userItem}>
            <div className={styles.userInfo}>
                <Avatar username={user.username} />
                <p className={styles.username}>{user.username}</p>
            </div>
            <div className={styles["friend-buttons"]}>
            <button onClick={viewProfile}>Profile</button>
            {user.following.some(follow => follow.toUserId === currentUser.user.id) ? (
              <button onClick={() => onFollow(user)}>Follow Back</button>
            ) : userFollowing.some(follow => follow.fromUserId === currentUser.user.id) ? (
              <button onClick={() => onUnfollow(user)}>Unfollow</button>
            ) : (
              <button onClick={() => onFollow(user)}>Follow</button>
            )}


            </div>

        </div>
    );
}
