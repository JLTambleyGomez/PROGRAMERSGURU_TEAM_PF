import s from "../Profile.module.css";
import theme from "../../../../theme/theme";

export function Compras () {
    return (
        <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
            <img src="https://www.svgrepo.com/show/462008/mobile-payment-dollar.svg" alt="compras" />
            <h2>TUS COMPRAS</h2>
            <p>Acá tendrás el resumen de todas tus compras</p>
        </div>
    )
}