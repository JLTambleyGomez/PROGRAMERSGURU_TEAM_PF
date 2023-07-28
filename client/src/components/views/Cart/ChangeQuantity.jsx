import styles from "./CartV2.module.css"
import theme from "../../../theme/theme";

export function ChangeQuantity({handleAddButton, removeFromCart, P}) {
    return (
        <div className={styles.cantidad}>
            
            {P.id && P.name && (
                <>
                    <img
                        src="https://www.svgrepo.com/show/527587/add-square.svg"
                        alt=""
                        className={`${styles.add} ${styles[theme("add")]}`}
                        onClick={() => handleAddButton("suma", P)}
                    />
                    <p>{P.quantity}</p>
                    <img
                        src="https://www.svgrepo.com/show/527816/minus-square.svg"
                        alt=""
                        className={`${styles.add} ${styles[theme("add")]}`}
                        onClick={() => handleAddButton("resta", P)}
                    />
                </>

            )}
                <img
                    src="https://www.svgrepo.com/show/525134/trash-bin-trash.svg"
                    alt=""
                    className={`${styles.trash} ${styles[theme("trash")]}`}
                    onClick={() => removeFromCart(P.id)}
                />

        </div>
    );
}
// quantity={P.quantity}
