import React from 'react';
import styles from './User.module.css';
import Avatar from '../Common/Avatar';

export default function User({ user, onClick }) {
    return (
        <div className={styles.userItem} onClick={() => onClick(user)}>
            <Avatar username={user.username} />
            <div className={styles.userInfo}>
                <p className={styles.username}>{user.username}</p>
                {user.online && <span className={styles.onlineIndicator}></span>}
            </div>
        </div>
    );
}
