import styles from './searchModal.module.css';
import NotFriends from '../Friends/NotFriends';

export default function SearchModal({ visible, onClose, currentUser }) {

    console.log("SearchModal visible: ", visible);

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
                <h2>Search</h2>
                <input type="text" placeholder="Search for users" />
                <NotFriends currentUser={currentUser} />
            </div>

        </div>
    )
}