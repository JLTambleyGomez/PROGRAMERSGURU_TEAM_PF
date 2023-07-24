import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {clearUser} from "../../../Redux/actions";
import styles from "./Modal.module.css"

const ModalBannedUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeModal = async () => {
        
        await dispatch(clearUser());
        localStorage.clear();
        navigate('/')
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.item}>Tu cuenta está desactivada</h1>
            <h2>Si quieres ingresar, regístrate con otra cuenta</h2>
            <button onClick={closeModal} className={styles.subscriptionButtons}>Aceptar</button>
        </div>
    );
}


export default ModalBannedUser; 