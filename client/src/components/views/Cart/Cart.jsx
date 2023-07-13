import styles from "./Cart.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ventanaemergente/ventana";
//import { products } from "../../../Redux/product.json";

//_________________________module_________________________
function Cart () {

    //global state:
    const user = useSelector((state) => state.user);

    //states:
    const [products, setProducts] = useState([])
    const [ventana, setVentana] = useState(true);
    const [cantidad, setCantidad] = useState(0);
    console.log(products)
    
    //const:
    const navigate=useNavigate()

    const handleAddButton = (type) => {
        if (type === "suma") {
            setCantidad(cantidad + 1);
        } else if (type === "resta" && cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };

    //life-cycles:
    useEffect(() => {
        if (user.name) {
            setVentana(false);
        }
        setProducts(JSON.parse(localStorage.getItem("cart")))
    }, []);

    const handleDetailButtons= (id)=>{
        navigate(`/ProductDetail/${id}`)
    }

    //component:
    return (
        <main>
            {ventana && <Modal />}
            {!ventana && (
            <div className={styles.container}>
                <h1 className={styles.title}>TU CARRITO DE COMPRAS</h1>
                <div className={styles.flex}>
                    <ul className={styles.productscontainer}>
                        {products?.map((P, index) => (
                        <li className={styles.product} key={index}>

                            <div className={styles.info}>
                                <h3 onClick={() => handleDetailButtons(P.id)} className={styles.name}>{P.name}</h3> 
                                <h3 className={styles.price}>Precio: {P.price}</h3>
                            </div>
                            <img className={styles.img} src={P.image} alt={P.name} />
                            <div>
                            Cantidad
                                <div className={styles.cantidad}>
                                    <button onClick={() => handleAddButton("resta")} className={styles.cantidad_button}>-</button>
                                    <p>{cantidad}</p>
                                    <button onClick={() => handleAddButton("suma")} className={styles.cantidad_button}>+</button>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    <h1 className={styles.total}>TOTAL :</h1>
                </div>
                <span>
                {/* sumar */}
                </span>
            </div>
        )}
        </main>
    );
}

export default Cart;
