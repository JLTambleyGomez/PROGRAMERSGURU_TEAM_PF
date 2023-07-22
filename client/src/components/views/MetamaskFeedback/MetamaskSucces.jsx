import axios from "axios";
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { set_cart } from '../../../Redux/actions';
import styles from './MetamaskFeedback.module.css';


//_________________________module_________________________
const MetaMaskSucces = () => {

    //global state:
    const cart = useSelector((state) => state.cart);

    //state:
    const [transaction, setTransaction] = useState('');

    //const:
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");
    
    
    //life-cycle:
    useEffect(() => {
        if (!token) navigate("/IniciaSession")
    },[])
    
    useEffect(() => {
        if (location.state) setTransaction(location.state.transaction);
    }, [location.state]);
    
    useEffect(() => {
        dispatch(set_cart());
        console.log(cart);
        console.log("este es el carrito:" + " " + cart);
        console.log("este es el email:" + " " + email)
    }, [])
    
    
    useEffect(() => {
        (async () => {
            try {
                const compraString = localStorage.getItem("cart"); // Obtener el contenido del carrito del almacenamiento local como una cadena de texto
                const compra = JSON.parse(compraString); // Convertir la cadena de texto a un arreglo de objetos
                const email = localStorage.getItem("email");
                console.log(cart);
                
                
                await axios.post(
                    `http://localhost:3001/Pagos/feedbackmetamask?payment_id=${transaction}&email=${email}`,
                    {compra});
                    
                    localStorage.setItem("cart", "[]");
                } catch (error) {
                }
            })();
            return ()=>{ localStorage.setItem("cart", "[]");}
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
