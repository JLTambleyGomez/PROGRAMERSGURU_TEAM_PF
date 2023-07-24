import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set_cart, get_User_By_Email } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./CartV2.module.css";
import Modal from "../ventanaemergente/ventana";

import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";

//_________________________module_________________________
function Cart() {
    //global states:
    const dark = useSelector(state => state.darkMode)
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    //states:
    const [ventana, setVentana] = useState(true);
    const [compra, setCompra] = useState({});
    const [MostrarPagos, setMostrarPagos] = useState(false);
    const [adressForm, setAdressForm] = useState(false);
    const [message, setMessage] = useState("");

    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //function:
    const handleAddButton = (type, P) => {
        if (type === "suma" && P.quantity < P.stock) {
            P.quantity = P.quantity + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        } else if (type === "resta" && P.quantity > 1) {
            P.quantity = P.quantity - 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        }
        setMostrarPagos(false);
    };

    const removeFromCart = (id) => {
        const cart = localStorage.getItem("cart");
        if (!cart) {
            localStorage.setItem("cart", "[]");
        }
        const oldCart = JSON.parse(localStorage.getItem("cart")).filter(
            (item) => item.id !== id
        );
        localStorage.setItem("cart", JSON.stringify(oldCart));
        dispatch(set_cart());
    };

    const handleDetailButtons = (id) => {
        navigate(`/ProductDetail/${id}`);
    };

    const calculateTotal = () => {
        let total = 0;
        cart?.forEach((product) => {
            const productTotal = product.price * product.quantity;
            total += productTotal;
        });
        return total;
    };

    const handlePagarButton = () => {
        dispatch(set_cart());

        const arrayListOfProducts = cart?.map(
            (product) =>
                `Producto: ${product.name} - Precio: ${product.price} - Cantidad: ${product.quantity}`
        );
        const stringListOfProducts = arrayListOfProducts?.join("\n");
        const listOfProducts = stringListOfProducts
            ? "Lista de productos comprados: \n" + stringListOfProducts
            : "No hay productos en el carrito";
        console.log(listOfProducts);

        const referencia = {
            description: listOfProducts,
            price: calculateTotal(),
            quantity: 1,
        };

        setCompra(referencia);
        setMostrarPagos(true);
    };

    //life-cycles:
    useEffect(() => {
        (() => {
            const email = localStorage.getItem("email");
            if (email) setVentana(false);
            if (!user) {
                dispatch(get_User_By_Email(email));
                if (!user.address) setMessage("Debe completar los datos");
            }
        })();
        dispatch(set_cart());
    }, [user]);

    //component:
    return (
        <main>
            {ventana && <Modal />}
            {!ventana && (
                <div className={styles.container}>
                    {/* PRODUCTOS DEL CARRO */}
                    {/* <h2 className={styles.title}>TU CARRITO DE COMPRAS</h2> */}
                    <div className={styles.flex}>
                        <div className={styles.productscontainer}>
                            {cart?.map((P, index) => (
                                <div className={`${styles.info} ${styles[theme("info")]}`}>
                                    <div className={styles.description}>
                                        {/* NOMBRE */}
                                        <span
                                            onClick={() =>
                                                handleDetailButtons(P.id)
                                            }
                                            className={styles.productName}
                                        >
                                            {P.name}
                                        </span>
                                        {/* PRECIO */}
                                        <span className={styles.price}>
                                            Precio: ${P.price}
                                        </span>
                                    </div>
                                    {/* CANTIDAD */}
                                    <div className={styles.masinfo}>
                                        {/* IMAGEN */}
                                        <img
                                            className={styles.img}
                                            src={P.image}
                                            alt={P.name}
                                        />
                                        {/* Cantidad */}
                                        <div className={styles.cantidad}>
                                            <img
                                                src="https://www.svgrepo.com/show/527587/add-square.svg"
                                                alt=""
                                                className={`${styles.add} ${styles[theme("add")]}`}
                                                onClick={() =>
                                                    handleAddButton("suma", P)
                                                }
                                            />
                                            <p>{P.quantity}</p>
                                            <img
                                                src="https://www.svgrepo.com/show/527816/minus-square.svg"
                                                alt=""
                                                className={`${styles.add} ${styles[theme("add")]}`}
                                                onClick={() =>
                                                    handleAddButton("resta", P)
                                                }
                                            />
                                            <img
                                                src="https://www.svgrepo.com/show/525134/trash-bin-trash.svg"
                                                alt=""
                                                className={`${styles.trash} ${styles[theme("trash")]}`}
                                                onClick={() =>
                                                    removeFromCart(P.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* RESUMEN */}
                        <div className={`${styles.total} ${styles[theme("total")]}`}>
                            <span className={styles.finalizar}>
                                Finaliza tu compra
                            </span>
                            {message ? (
                                <Link to="/profile">
                                    <h1>{message}</h1>
                                </Link>
                            ) : (
                                ""
                            )}
                            <ul>
                                {/* PRODUCTOS DEL RESUMEN */}
                                {cart?.map((product, index) =>
                                    product.quantity !== 0 ? (
                                        <li
                                            className={styles.items}
                                            key={index}
                                        >
                                            <h4>
                                                {product.name} x{" "}
                                                {product.quantity}
                                            </h4>
                                        </li>
                                    ) : null
                                    )}
                            </ul>
                            {/* VALOR TOTAL DEL RESUMEN */}
                            {!message && (
                                <div className={styles.pagar}>
                                    <div className={styles.valorTotal}>
                                        <span>Valor Total: </span>
                                        <span>${calculateTotal()}</span>
                                    </div>
                                    <Link to="/cart">
                                    <button
                                        className={styles.boton}
                                    >
                                        Ir a Pagar
                                    </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;
