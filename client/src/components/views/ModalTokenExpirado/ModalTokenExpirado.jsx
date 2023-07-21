import { useNavigate } from "react-router";
import styles from "./Modal.module.css";


//_________________________module_________________________
function TokenExpirado () {
const navigate = useNavigate()

const handleRedirectionButon=()=>{
    navigate("/")
}

    //component:
    return (
        <div>
           
                    <div className={styles.container}>
                        <h1 className={styles.item}>"Tu sesión ha expirado"!</h1>
                        <button onClick={handleRedirectionButon}>Iniciar Sesión </button>
                    </div>
          
        </div>
    );
};

export default TokenExpirado;