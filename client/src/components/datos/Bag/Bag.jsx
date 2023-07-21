import { useEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggle_shopbag, set_cart, Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import s from "./Bag.module.css";

//_________________________module_________________________
function Bag () {

    //global state:
    const shopbag = useSelector((state) => state.shopbag)
    const cart = useSelector((state) => state.cart);
    const dark = useSelector((state) => state.darkMode)

    //const:
    const dispatch = useDispatch();

    //functions:
    const toggleShopbag = () => {
        dispatch(toggle_shopbag(!shopbag))
    }

    const handleAddButton = (type, product) => {
        if (type === "suma" && product.quantity < product.stock) {
            product.quantity = product.quantity + 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        } else if (type === "resta" && product.quantity > 0) {
            product.quantity = product.quantity - 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        }
    };

    const calculateTotal = () => {
        let total = 0;
        cart?.forEach((product) => {
            const sum = product.price * product.quantity;
            total += sum;
        });
        return total;
    };

    //life-cycles:
    useEffect(() => {
        dispatch(set_cart());
    }, [])

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])


    //component:
    return (
        <div className={s.shopbagOverlay} onClick={toggleShopbag}>
            <aside className={`${s.shopbag} ${s[theme("shopbag")]} ${shopbag ? s.shopbagOpen : ""}`} onClick={(event) => event.stopPropagation()}>
            <h1>Revisa tu orden</h1>
                {
                    cart?.map((product, index) => {
                        return (
                            <div key={index} className={`${s.item} ${s[theme("item")]}`}>
                                <div className={s.section1}>
                                    <button
                                        onClick={() => handleAddButton("resta", product)}
                                        className={`${s.minusPlus} ${s[theme("minusPlus")]}`}
                                    >
                                        -
                                    </button>
                                        <img src={product.image} alt={product.name} />
                                    <button
                                        onClick={() => handleAddButton("suma", product)}
                                        className={`${s.minusPlus} ${s[theme("minusPlus")]}`}
                                        >
                                        +
                                    </button>
                                    <hr style={{height: "1rem"}}/>
                                    {product.quantity}
                                </div>
                                <p>{product.name}</p>
                            </div>
                        )
                    })
                }
                <h1>Subtotal: $ {calculateTotal()}</h1>
            </aside>
        </div>
    )
}

export default Bag;