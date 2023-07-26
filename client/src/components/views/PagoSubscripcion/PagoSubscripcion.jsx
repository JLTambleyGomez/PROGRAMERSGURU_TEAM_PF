import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Dark_Mode, get_suscriptions } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./PagoSubscripcion.module.css"


//_________________________module_________________________
function PagoSubscripcion () {

    //global states:
    const dark = useSelector((state) => state.darkMode);
    const subscripciones = useSelector((state) => state.subscriptions);
    // const cart = useSelector((state) => state.cart);

    //states:
    const [compra, setCompra] = useState(null);
    const [blocked, setBlocked] = useState(false);
    const [elegido,setElegido] = useState(null)


    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //functions:
    const handleAddSubscripcion = (selectedSubscripcion) => {
        setBlocked(selectedSubscripcion.id)
        console.log(selectedSubscripcion.id)
        const oldCart = JSON.parse(localStorage.getItem("cart")) 
        oldCart.push(selectedSubscripcion)
        localStorage.setItem("cart", JSON.stringify(oldCart))
        // navigate("/Cart")
    }


// a ver...
    //life-cycles:
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) navigate("/IniciaSession");        
    }, [])

    useEffect(() => {
        dispatch(Dark_Mode());
    }, [dark])

    useEffect(() => {
        dispatch(get_suscriptions())
        console.log({compra})
    }, [compra])


    useEffect(() => {
        (async () => {
            const cartString = localStorage.getItem("cart");

            if (cartString) {
                const cart = JSON.parse(cartString);
                if (Array.isArray(cart) && cart.length > 0) {
                    const foundSub = cart.find((item) => item.title)
                    const { id } = foundSub;
                    setBlocked(id);
                }
            }
        })();
    }, []);
 


    //component:
    return (
        <main className={`${styles.component} ${styles[theme("component")]}`}>
            <h1 className={styles.title}>Subscríbete ya! y disfruta sin limitaciones</h1>

            <div className={styles.content}>
                <div className={styles.options}>
                    {
                        Array.isArray(subscripciones) && subscripciones.length > 0 && subscripciones.map((subscripcion) => (
                            <div key={subscripcion.id} className={styles.product}>
                                <img src={subscripcion.image} alt={subscripcion.title} className={styles.productImage} />
                                <h3 className={styles.item}>{subscripcion.title}</h3>
                                <p>{subscripcion.description}</p>
                                <p className={styles.p}>Por tan solo {subscripcion.price} dólares</p>
                                {
                                    !blocked ? (
                                            <p className={styles.buton} onClick={() => handleAddSubscripcion(subscripcion)}>
                                                    agregar
                                            </p>
                                    ) : (
                                        (blocked === subscripcion.id) ? (
                                            <p className={styles.buton} onClick={() => handleAddSubscripcion(subscripcion)}>
                                                borrar de carrito
                                            </p>
                                        ) : (
                                            <p>YA TIENES ELECCION</p>
                                        )
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
          
            </div>
        </main>
    );
}

export default PagoSubscripcion;