import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { set_cart, get_User_By_Email } from "../../../Redux/actions";

import styles from "./Cart.module.css";
import Modal from "../ventanaemergente/ventana";
import { ChangeQuantity } from "./ChangeQuantity";

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
    const [cargasimulada,setCargasimulada]=useState(false)
    const [carrovacio,setCarrovacio]=useState(true)
    
    
    //const:
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

    const removeFromCart = async (id) => {
        setMostrarPagos(false);
        
         
        const cart = await localStorage.getItem("cart");
        if (!cart) {
            localStorage.setItem("cart", "[]");
        }
        const oldCart = JSON.parse(localStorage.getItem("cart")).filter(
            (item) => item.id !== id
        );
        localStorage.setItem("cart", JSON.stringify(oldCart));
        dispatch(set_cart());
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
        setCargasimulada(true);
        dispatch(set_cart());
        
        const arrayListOfProducts = cart?.map(
            (product) =>
            `Producto: ${product.name || product.description} - Precio: ${product.price} - Cantidad: ${product.quantity}`
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
      
       
        const carga =async ()=>{
        await new Promise(resolve => setTimeout(resolve, 4000));    setCargasimulada(false)}
         carga()
    };
     
    const mostrar = ()=>{
        setMostrarPagos(true);
        console.log("mostrar")
    }
   

    useEffect(()=>{
        if (Array.isArray(cart) && cart.length){
            setCarrovacio(false)}else
            if(Array.isArray(cart) &&!cart.length){
                setCarrovacio(true)
            }

    },[cart])
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
                        <div className={styles.productscontainer}>
                        {
                            cart?.map((P, index) => (
                                <li className={styles.product} key={index}>
                                    <div className={styles.info}>
                                        {/* NOMBRE */}
                                        <h3 className={styles.name2}>
                                            {P.name || P.description}
                                        </h3>
                                        {/* PRECIO */}
                                        <h3 className={styles.price}>
                                            Precio: $ {P.price}
                                        </h3>
                                    </div>
                                    <div className={styles.right}>
                                    {/* CANTIDAD */}
                                    <ChangeQuantity handleAddButton={handleAddButton} removeFromCart={removeFromCart} P={P}/>
                                     

                                    {/* IMAGEN */}
                                    <a href={P.id && `/ProductDetail/${P.id}`}>
                                        <img
                                            className={styles.img}
                                            src={P.image}
                                            alt={P.name}
                                        />
                                    </a>
                                    </div>
                                </li>
                            ))
                        }
                        </div>
                    {/* RESUMEN */}
                        <div className={styles.total}>
                            <h1 className={styles.h1}>LO QUE LLEVAS:</h1>
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
                                    {Array.isArray(cart) && cart?.map((product, index) =>
                                        product.quantity !== 0 && (product.name || product.description) ? (
                                            <li
                                                className={styles.items}
                                                key={index}
                                            >
                                                <h4>
                                                    {product.name || product.description} x{" "}
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
                                            <p className={styles.boton} onClick={handlePagarButton}>
                                          <p className={styles.name}>Ir a Pagar</p> 
                                             </p>
                                        </div>
                                    )}

                                    {MostrarPagos && (
                                        <div>
                                            <p>Escoge tu medio de Pago</p>
                                            <p className={styles.metamask}>
                                            <PagoMetamask
                                                total={calculateTotal()}
                                            /></p>
                                            {compra?.description && (
                                                <PagoMercadopago
                                                    reference={compra}
                                                    mostrar={mostrar}
                                                />
                                            )}
                                        </div>
                                    )}
                                    {cargasimulada &&
                                    <div className={styles.cargasimulada}><p className={styles.cargandotxt}>Cargando Pagos</p></div> }
                                    {carrovacio && 
                                    <div className={styles.cargasimulada} ><p className={styles.cargandotxt}>Primero debes agregar productos</p></div>}
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