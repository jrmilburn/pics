import styles from './ProfileHeader.module.css';
import Avatar from '../Common/Avatar';
import Settings from '../../assets/settings.svg';
import SettingsModal from '../Settings/SettingsModal';
import EditProfile from '../EditProfile/EditProfile';
import { useState } from 'react';   

export default function ProfileHeader({ user, currentUser }) {

    if(!user || !user.posts || !user.followers || !user.following) return null;

    const [showSettings, setShowSettings] = useState(false);
    const [editProfile, setEditProfile] = useState(false);

    return (
        <div className={styles["profile-header"]}>
            <Avatar username={user.username} />
            <div className={styles["profile-info"]}>
                <div className={styles["username"]}>
                    <h1>{user.username}</h1>
                    <button onClick={() => setEditProfile(true)}>Edit Profile</button>
                    <img src={Settings} alt="" className={styles['settings']} onClick={() => setShowSettings(true)}/>
                </div>
                <div className={styles["profile-stats"]}>
                    <h2>{user.posts.length} posts</h2>
                    <h2>{user.followers.length} followers</h2>
                    <h2>{user.following.length} following</h2>
                </div>
                <div className={styles["tag"]}>
                    <h2 className={styles['user-tag']}>@{user.username}</h2>
                </div>
            </div>

            <SettingsModal visible={showSettings} onClose={() => setShowSettings(false)} currentUser={currentUser} />
            <EditProfile visible={editProfile} onClose={() => setEditProfile(false)} currentUser={currentUser} />

        </div>
    )
}