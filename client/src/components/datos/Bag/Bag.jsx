import { useSelector, useDispatch } from "react-redux";
import { toggle_shopbag } from "../../../Redux/actions";

import s from "./Bag.module.css";

//_________________________module_________________________

function Bag () {

    //global state:
    const shopbag = useSelector((state) => state.shopbag)

    //function:
    const toggleShopbag = () => {
        dispatch(toggle_shopbag(!shopbag))
    }

    //component:
    return (
        <>
            {
                shopbag && (
                    <div className={s.shopbagOverlay} onClick={toggleShopbag}>
                        <aside className={`${s.shopbag} ${shopbag ? s.open : ''}`} onClick={(event) => event.stopPropagation()}>
                            elementos
                        </aside>
                    </div>
                )
            }
        </>
    )
}

export default Bag;