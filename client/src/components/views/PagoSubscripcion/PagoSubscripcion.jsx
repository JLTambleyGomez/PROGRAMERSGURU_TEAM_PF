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
    const [blocked, setBlocked] = useState(false);


    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //functions:
    const handleAddSubscripcion = (selectedSubscripcion) => {
        setBlocked(selectedSubscripcion.id)
        console.log(selectedSubscripcion.id)
        const oldCart = JSON.parse(localStorage.getItem("cart")) 
        selectedSubscripcion.quantity = 1
        oldCart.push(selectedSubscripcion)
        localStorage.setItem("cart", JSON.stringify(oldCart))
        navigate("/Cart")
    }

    const handleDeleteSubscripcion = (selectedSubscripcion) => {
        setBlocked(false);
        console.log(selectedSubscripcion.id);
        const oldCart = JSON.parse(localStorage.getItem("cart"));
        const newCart = oldCart.filter((sub) => sub.id !== selectedSubscripcion.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

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
    }, [])

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

    useEffect(() => {
        (async () => {
            const cart = await localStorage.getItem("cart");
            if (!cart) {
                await localStorage.setItem("cart", "[]");
                dispatch(set_cart());
            }
        })()
    }, [])
 


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
                                                    Agregar
                                            </p>
                                    ) : (
                                        (blocked === subscripcion.id) ? (
                                            <p className={styles.buton} onClick={() => handleDeleteSubscripcion(subscripcion)}>
                                                Borrar del carrito
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