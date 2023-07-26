import s from "./PaymentOrders.module.css";
import styles from "../../Profile.module.css";
import theme from "../../../../../theme/theme";
import { NavLink } from "react-router-dom";

export function PaymentOrders({ payments }) {
    if (!payments?.length) {
        return (
            <div className={`${styles.emptyTab} ${styles[theme("emptyTab")]}`}>
                <img
                    src="https://www.svgrepo.com/show/462008/mobile-payment-dollar.svg"
                    alt="compras"
                />
                <h2>TUS COMPRAS</h2>
                <p>Acá tendrás el resumen de todas tus compras</p>
            </div>
        );
    }

    return (
        <div className={`${s.payments} ${s[theme("payments")]}`}>
            {payments?.map((pay) => {
                return (
                    <div className={`${s.payment} ${s[theme("payment")]}`} key={pay.id}>
                        <div
                            className={`${s.payHeader} ${
                                s[theme("payHeader")]
                            }`}
                        >
                            <span className={s.payId}>
                                Resumen de compra N°: {pay?.id}
                            </span>
                            <span className={s.date}>
                                {pay?.date
                                    .slice(0, 10)
                                    .split("-")
                                    .toReversed()
                                    .join("-")}                            
                            </span>
                        </div>
                        <div className={`${s.payBody} ${s[theme("payBody")]}`}>
                            <div className={s.productsInfo}>
                                {pay?.Products?.map(product => {
                                    return (
                                        <div className={s.productInfo}>
                                            <div className={s.centrar}>
                                            <div className={s.image}>
                                                <NavLink to={`/ProductDetail/${product.id}`}>
                                                <img src={product?.image} alt="" />
                                                </NavLink>
                                            </div>
                                            <div className={s.productData}>
                                                <span className={s.productName}>{product?.name}</span>
                                                <span>Categoría: {product?.Category?.name}</span>
                                                <span>Cantidad: {product?.shopping_cart?.quantity}</span>
                                            </div>
                                            </div>
                                            <span className={s.productPrice}>Precio: ${product?.price}</span>
                                        </div>
                                    )
                                })}
                            <span className={s.totalPrice}>Precio total: ${pay?.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
