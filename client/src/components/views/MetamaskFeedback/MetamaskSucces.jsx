import axios from "axios";
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { set_cart, get_User_By_Email} from '../../../Redux/actions';
import styles from './MetamaskFeedback.module.css';
import {getMetamaskFeedback} from '../../../axiosRequests/axiosRequests'


//_________________________module_________________________
const MetaMaskSucces = () => {

    //global state:
    const cart = useSelector((state) => state.cart);

    
    //const:
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");
    
    //state:
    const [transaction, setTransaction] = useState(location.state.transaction);

    //life-cycle:
    useEffect(() => {
        if (!token) navigate("/IniciaSession")
    },[])
    
    /useEffect(() => {
        if (location.state) setTransaction(location.state.transaction);
    }, [location.state]);
    
    useEffect(() => {
        (async () => {
            try {
                dispatch(set_cart());
                console.log(cart);
                const compraString = localStorage.getItem("cart"); // Obtener el contenido del carrito del almacenamiento local como una cadena de texto
                const compra = JSON.parse(compraString); // Convertir la cadena de texto a un arreglo de objetos
                const email = localStorage.getItem("email");
             
              await new Promise(resolve => setTimeout(resolve, 1000));
               if (transaction){
                await getMetamaskFeedback({compra, transaction, email})}

            } catch (error) {

            }
            })();
            return ()=>{ localStorage.setItem("cart", "[]");
            dispatch(get_User_By_Email(email));
        }
            
        }, []);
        
        
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
                </div>
            </div>
            <div className={styles.detalles}>
                <div className={styles.detalles2}>
                    <h1 className={styles.h1}>Pago Exitoso!</h1>
                    <h3 className={styles.idtransaccion}>ID de la transacción: {transaction}</h3>
                    <NavLink className={styles.tohome} to="/HomePage">Ir a Home</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MetaMaskSucces;
