import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from './MetamaskFeedback.module.css';


//_________________________module_________________________
function MetaMaskFailure () {

    //states:
    const [error, setError] = useState('');

    //const:
    const location = useLocation();
    const navigate = useNavigate()

    //life-cycles:
  //life-cycle:
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    if (!token) navigate("/IniciaSession")
},[])


    useEffect(() => {
        if (location.state && location.state.error) setError(location.state.error);
    }, [location.state]);
    

    //component:
    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <div className={styles.imgcontainer}>
                    <img
                        className={styles.img}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
                        alt="newsBanner"
                    />
                    <p className={styles.x}>Error</p>
                </div>
            </div>
            <div className={styles.detalles}>
                <div className={styles.detalles2}>
                    <h1 className={styles.h1}>Pago Fallido!</h1>
                    <h3 className={styles.idtransaccion}>{error}</h3>
                    <NavLink className={styles.tohome} to="/HomePage">Ir a Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MetaMaskFailure;
