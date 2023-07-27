import { useNavigate } from "react-router-dom";
//import s from "./Modal.module.css";

const ModalProfile = () => {
    const navigate = useNavigate();

    const closeModal = () => {
       navigate("/HomePage");
    }

    return (
        <div>
            <h1>No tienes acceso a esta sección de la página</h1>
            <p>Si quieres ingresar, regístrate</p>
            <button onClick ={closeModal}>Aceptar</button>
        </div>
    )
}

export default ModalProfile;