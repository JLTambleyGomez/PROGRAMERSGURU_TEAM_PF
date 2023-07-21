import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set_cart, get_User_By_Email } from "../../../Redux/actions";

import styles from "./Cart.module.css";
import Modal from "../ventanaemergente/ventana";
import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";

//_________________________module_________________________
function Cart() {
    //global states:
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
        } else if (type === "resta" && P.quantity > 0) {
            P.quantity = P.quantity - 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        }
        setMostrarPagos(false);
    };

    const removeFromCart = async (id) => {
        const cart = await localStorage.getItem("cart");
        if (!cart) {
            await localStorage.setItem("cart", "[]");
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
        (async () => {
            const email = localStorage.getItem("email");
            if (email) setVentana(false);
            if (!user) {
                await dispatch(get_User_By_Email(email));
                if (!user.address) setMessage("Debe completar los datos");
            }
        })();
        dispatch(set_cart());
        // dispatch(get_User_By_Email());
    }, [user]);

    //component:
    return (
        <main>
            {ventana && <Modal />}
            {!ventana && (
                <div className={styles.container}>
                    {/* PRODUCTOS DEL CARRO */}
                    <h1 className={styles.title}>TU CARRITO DE COMPRAS</h1>
                    <div className={styles.flex}>
                        <ul className={styles.productscontainer}>
                            {cart?.map((P, index) => (
                                <li className={styles.product} key={index}>
                                    <div className={styles.info}>
                                        {/* NOMBRE */}
                                        <h3
                                            onClick={() =>
                                                handleDetailButtons(P.id)
                                            }
                                            className={styles.name}
                                        >
                                            {P.name}
                                        </h3>
                                        {/* PRECIO */}
                                        <h3 className={styles.price}>
                                            Precio: {P.price}
                                        </h3>
                                    </div>
                                    {/* IMAGEN */}
                                    <img
                                        className={styles.img}
                                        src={P.image}
                                        alt={P.name}
                                    />
                                    {/* CANTIDAD */}
                                    <div>
                                        Cantidad
                                        <div className={styles.cantidad}>
                                            <button
                                                onClick={() =>
                                                    handleAddButton("resta", P)
                                                }
                                                className={
                                                    styles.cantidad_button
                                                }
                                            >
                                                -
                                            </button>
                                            <p>{P.quantity}</p>
                                            <button
                                                onClick={() =>
                                                    handleAddButton("suma", P)
                                                }
                                                className={
                                                    styles.cantidad_button
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(P.id)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* RESUMEN */}
                        <div className={styles.total}>
                            <h1>LO QUE LLEVAS:</h1>
                            <div className={styles.totalcontainer}>
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
                                                    {product.name} X{" "}
                                                    {product.quantity}
                                                </h4>
                                            </li>
                                        ) : null
                                    )}
                                    {/* VALOR TOTAL DEL RESUMEN */}
                                    {!message && (
                                        <div>
                                            <hr />
                                            <h1>
                                                Valor Total: ${" "}
                                                {calculateTotal()}
                                            </h1>
                                            <p onClick={handlePagarButton}>
                                                ir a Pagar
                                            </p>
                                            {/* MEDIOS DE PAGO */}
                                        </div>
                                    )}

                                    {MostrarPagos && (
                                        <div>
                                            <p>Escoge tu medio de Pago</p>
                                            {compra.description && (
                                                <PagoMercadopago
                                                    reference={compra}
                                                />
                                            )}
                                            <PagoMetamask
                                                total={calculateTotal()}
                                            />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;
