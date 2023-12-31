import s from "./PaymentOrders.module.css";
import styles from "../../Profile.module.css";
import theme from "../../../../../theme/theme";
import { NavLink } from "react-router-dom";

export function PaymentOrders({ payments }) {
    const mp = "https://www.sitepro.com.ar/web/wp-content/uploads/2022/08/Mercado-pago-1024x267.png"
    const mm = "https://altcoinsbox.com/wp-content/uploads/2023/03/full-metamask-logo.webp"

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
                    <div className={pay?.status === "rejected" ? `${s.paymentRejected} ${s[theme("paymentRejected")]}` : `${s.payment} ${s[theme("payment")]}`} key={pay.id}>
                        <div
                            className={`${s.payHeader} ${
                                s[theme("payHeader")]
                            }`}
                        >
                            <span className={s.payMethod}>
                                {pay.status==="rejected" ? "Compra rechazada" : "Resumen de compra"}   
                            </span>
                            <img src={pay.id[1]==="x" ? mm : mp} alt="" />
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
                                        <div key={product?.id} className={s.productInfo}>
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
                                {pay?.Subscription && 
                                    (<div className={s.productInfo}>
                                        <div className={s.centrar}>
                                        <div className={s.image}>
                                            <img src={pay?.Subscription?.image} alt="" />
                                        </div>
                                        <div className={s.productData}>
                                            <span className={s.productName}>{pay?.Subscription?.title}</span>
                                        </div>
                                        </div>
                                        <span className={s.productPrice}>Precio: ${pay?.Subscription?.price}</span>
                                    </div>)
                                }
                                <div className={s.footer}>
                                    <span className={s.totalPrice}>Monto total: ${pay?.totalPrice}</span>
                                </div>
                                    <span className={s.payId}>Id de la transacción: {pay?.id}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
