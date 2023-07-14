import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ventanaemergente/ventana";
import { set_cart } from "../../../Redux/actions"

function Cart() {
  // global state:
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // states:
  const [ventana, setVentana] = useState(true);

  // constants:
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  };

  const removeFromCart = async (id) => {
    const cart = await localStorage.getItem("cart")
    if (!cart) {
        await localStorage.setItem("cart", "[]")
    }
    const oldCart = JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id !== id) //convierte el JSON del carrito en un objeto js, en este caso, un array.
    localStorage.setItem("cart", JSON.stringify(oldCart))
    dispatch(set_cart())
  /*  const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);*/
};

  const handleDetailButtons = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      const productTotal = product.price * product.quantity;
      total += productTotal;
    });
    return total;
  };

  // life-cycles:
  useEffect(() => {
    if (user.name) {
      setVentana(false);
    }
    dispatch(set_cart());
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // component:
  return (
    <main>
      {ventana && <Modal />}
      {!ventana && (
        <div className={styles.container}>
          <h1 className={styles.title}>TU CARRITO DE COMPRAS</h1>
          <div className={styles.flex}>
            <ul className={styles.productscontainer}>
              {cart?.map((P, index) => (
                <li className={styles.product} key={index}>
                  <div className={styles.info}>
                    <h3
                      onClick={() => handleDetailButtons(P.id)}
                      className={styles.name}
                    >
                      {P.name}
                    </h3>
                    <h3 className={styles.price}>Precio: {P.price}</h3>
                  </div>
                  <img className={styles.img} src={P.image} alt={P.name} />
                  <div>
                    Cantidad
                    <div className={styles.cantidad}>
                      <button
                        onClick={() => handleAddButton("resta", P)}
                        className={styles.cantidad_button}
                      >
                        -
                      </button>
                      <p>{P.quantity}</p>
                      <button
                        onClick={() => handleAddButton("suma", P)}
                        className={styles.cantidad_button}
                      >
                        +
                      </button>
                    </div>
                      <button onClick={() => removeFromCart(P.id)}>X</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <h1>LO QUE LLEVAS  :</h1>
              <div className={styles.totalcontainer}>
                <ul>
                 { cart?.map((P, index) => (P.quantity !== 0) &&(
                    <li className={styles.items} key={index}>
                      <h4>
                        {P.name} X {P.quantity}
                      </h4>
                    </li>
))}
                  <hr />
                <h1>Valor Total: $ {calculateTotal()}</h1> {/* Agrega el total calculado aquí */}

                </ul>
              </div>
            </div>
          </div>
          <span>{/* sumar */}</span>
        </div>
      )}
    </main>
  );
}

export default Cart;
