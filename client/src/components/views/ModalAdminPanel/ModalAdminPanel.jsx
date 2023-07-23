import { useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './ModalAdminPanel.module.css'
const ModalAdminPanel = () => {

    const navigate = useNavigate()

    const closeModal = () => {
        navigate('/HomePage')
    }

    return(
        <div>
            <div className={styles.container}>
                <h1 className={styles.item}>Error</h1>
                <h2>No tienes acceso a esta parte de la página</h2>
                <button onClick={closeModal} className={styles.subscriptionButtons}>Volver</button>
            </div>
        </div>
    );
}


export default ModalAdminPanel; 