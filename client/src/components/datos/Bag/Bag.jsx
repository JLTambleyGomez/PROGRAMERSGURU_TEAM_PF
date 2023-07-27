import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle_shopbag, set_cart, Dark_Mode, clear_highlight } from "../../../Redux/actions";

import theme from "../../../theme/theme";

import s from "./Bag.module.css";

//_________________________module_________________________
function Bag () {

    //global state:
    const shopbag = useSelector((state) => state.shopbag);
    const cart = useSelector((state) => state.cart);
    const dark = useSelector((state) => state.darkMode);
    const highlightedItem = useSelector((state) => state.highlightedItem);

    //const:
    const dispatch = useDispatch();

    //function:
    const toggleShopbag = () => {
        dispatch(toggle_shopbag(!shopbag));
        dispatch(clear_highlight());
    }

    const handleAddButton = (type, product) => {
        dispatch(clear_highlight());
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

    const removeFromCart = async (id) => {
        const cart = await localStorage.getItem("cart")
        if (!cart) {
            await localStorage.setItem("cart", "[]")
        }
        const oldCart = JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id !== id) //convierte el JSON del carrito en un objeto js, en este caso, un array.
        await localStorage.setItem("cart", JSON.stringify(oldCart))
        dispatch(set_cart())
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
                            <div key={index} className={`${s.item} ${s[theme("item")]} ${product.id === highlightedItem ? s.highlight : ""}`}>
                                <div className={s.section1}>
                                    {
                                        product.quantity === 1 ? (
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className={s.binBox}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className={s.bin} viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAddButton("resta", product)}
                                                className={`${s.minusPlus} ${s[theme("minusPlus")]}`}
                                            >
                                                -
                                            </button>
                                        )
                                    }
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
                                <p>{product.name ? product.name : product.title}</p>
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