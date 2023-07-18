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
    const email = sessionStorage.getItem("email");
    const navigate = useNavigate()

    //functions:
    const calculateTotal = () => {
        let total = 0;
        cart?.forEach((product) => {
            const productTotal = product.price * product.quantity;
            total += productTotal;
        });
        return total;
    };

    //life-cycle:
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
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
