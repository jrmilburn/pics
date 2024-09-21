import React from 'react';
import styles from './Friend.module.css';
import Avatar from '../Common/Avatar';

export default function Friend({ user, onFollow }) {

    const viewProfile = () => {
        
    }

    return (
        <div className={styles.userItem}>
            <div className={styles.userInfo}>
                <Avatar username={user.username} />
                <p className={styles.username}>{user.username}</p>
            </div>
            <div className={styles["friend-buttons"]}>
                <button onClick={viewProfile}>Profile</button>
                <button onClick={onFollow}>Follow</button>
            </div>

        </div>
    );
}
