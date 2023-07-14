import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle_shopbag, set_cart } from "../../../Redux/actions";

import s from "./Bag.module.css";

//_________________________module_________________________

function Bag () {

    //global state:
    const shopbag = useSelector((state) => state.shopbag)
    const cart = useSelector((state) => state.cart);
    const arr = [1,2,3,4,5]

    //const:
    const dispatch = useDispatch();

    //function:
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

    //life-cycles:
    useEffect(() => {
        dispatch(set_cart());
    }, [])

    //component:
    return (
        <>
            {
                shopbag && (
                    <div className={s.shopbagOverlay} onClick={toggleShopbag}>
                        <aside className={`${s.shopbag} ${shopbag ? s.open : ''}`} onClick={(event) => event.stopPropagation()}>
                            {
                                cart.map((product) => {
                                    return (
                                        <div className={s.item}>
                                            <button
                                                onClick={() => handleAddButton("resta", product)}
                                                className={s.minusPlus}
                                            >
                                                -
                                            </button>
                                            <img className={s.img} src={product.image} alt={product.name} />
                                            <button
                                                onClick={() => handleAddButton("suma", product)}
                                                className={s.minusPlus}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )
                                })
                            }
                            TOTAL: 
                        </aside>
                    </div>
                )
            }
        </>
    )
}

export default Bag;