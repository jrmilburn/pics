import styles from './SettingsModal.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function SettingsModal({ visible, onClose, currentUser }) {
    
        const { logout } = useContext(AuthContext);

        if(!visible) return null;
    
        const handleOverlayClick = (e) => {
            if(e.target === e.currentTarget) {
                onClose();
            }
        }
    
        return (
            <div 
                className={styles["settings-modal-overlay"]}
                onClick={handleOverlayClick} >
    
                <div className={styles["settings-modal"]}>
                    <h2>Settings</h2>
                    <button onClick={() => logout()}>Logout</button> of <strong>{currentUser.user.username}</strong>
                    <button onClick={onClose}>Close</button>
                </div>
    
            </div>
        )
}