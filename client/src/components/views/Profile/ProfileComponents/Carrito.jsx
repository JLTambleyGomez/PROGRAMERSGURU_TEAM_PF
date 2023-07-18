import s from "../Profile_v2.module.css";

export function Carrito () {
    return (
        // <div className={!shopping_cart.hasOwnProperty() ? s.emptyTab : s.shopping_cart}>
        <div className={s.emptyTab}>
            <img src="https://www.svgrepo.com/show/460648/cart.svg" alt="carrito" />
            <h2>CARRITO DE COMPRAS</h2>
            <p>Todavía no agregaste ningún producto a tu carrito</p>
        </div>
    )
}