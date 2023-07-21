import s from "../Profile.module.css";

export function Compras ({dark}) {
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };
    return (
        // <div className={!payments.hasOwnProperty() ? s.emptyTab : s.payments}>
        <div className={`${s.emptyTab} ${s[theme("emptyTab")]}`}>
            <img src="https://www.svgrepo.com/show/462008/mobile-payment-dollar.svg" alt="compras" />
            <h2>TUS COMPRAS</h2>
            <p>Acá tendrás el resumen de todas tus compras</p>
        </div>
    )
}