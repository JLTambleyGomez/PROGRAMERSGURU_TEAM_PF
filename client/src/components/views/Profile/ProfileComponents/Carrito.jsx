import s from "../Profile.module.css";
import CartV2 from "../../Cart/CartV2";
import theme from "../../../../theme/theme";

export function Carrito() {

    const shoppingCart = JSON.parse(localStorage.getItem("cart")) || []
    console.log(shoppingCart);
    console.log(shoppingCart.length);
    if (!shoppingCart.length) {
        return (
            <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
                <img
                    src="https://www.svgrepo.com/show/460648/cart.svg"
                    alt="carrito"
                />
                <h2>CARRITO DE COMPRAS</h2>
                <p>Todavía no agregaste ningún producto a tu carrito</p>
            </div>
        );
    }

    return (
        <div className={`${s.cart} ${s[theme("cart")]}`}>
            <CartV2/>
        </div>
    );
}
