import styles from './searchModal.module.css';
import NotFriends from '../Friends/NotFriends';
import { useState } from 'react';

export default function SearchModal({ visible, onClose, currentUser }) {

    const [searchTerm, setSearchTerm] = useState('');

    if(!visible) return null;

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div 
            className={styles["search-modal-overlay"]}
            onClick={handleOverlayClick} >

            <div className={styles["search-modal"]}>
                <input 
                    type="text" 
                    placeholder="Search for users" 
                    className={styles['user-search']} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    value={searchTerm}/>
                <NotFriends currentUser={currentUser} searchTerm={searchTerm} onClose={onClose}/>
            </div>

        </div>
    )
}