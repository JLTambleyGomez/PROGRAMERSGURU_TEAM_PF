import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { filter_product_by_category, get_categories } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import s from "./CategorySection.module.css";


//_________________________module_________________________
function CategorySection( { menuRef, storeRef } ) {


    //functions:
    const [categories, setCategories] = useState([]);
    const [store, setStore] = useState(true);
    const [fly, setFly] = useState(null);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [initialLabelCoords, setInitialLabelCoords] = useState(null);
    const [clicked, setClicked] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const labelRef = useRef(null);
    const docWidth = window.innerWidth;


    //functions:
    const labelStyles = (index) => {
        if (fly === index && initialLabelCoords) {
        if (docWidth > 1000) {
            return {
                top: buttonPosition.top + "px",
                left: buttonPosition.left + "px",
            };
        } else if (docWidth > 500) {
            return {
                top: menuPosition.top + "px",
                left: menuPosition.left + "px",
            };
        }
        }
        return {};
    };

    const handleClick = (index) => {
        if (!clicked) {
        setClicked(true);
        const labelCoords = labelRef.current.getBoundingClientRect();
        const buttonCoords = storeRef.current.getBoundingClientRect();
        const menuCoords = menuRef.current.getBoundingClientRect();

        if (docWidth > 1000) {

            if (labelRef.current) {
                setInitialLabelCoords({
                    top: labelCoords.top,
                    left: labelCoords.left,
                });
            }
            setButtonPosition({
                top: buttonCoords.top,
                left: buttonCoords.left,
            });
        } else {
            setInitialLabelCoords({
                top: labelCoords.top,
                left: labelCoords.left - 2000,
            });
            setMenuPosition({
                top: menuCoords.top,
                left: menuCoords.left,
            });
        }

        setFly(index);

        const timer = setTimeout(() => {
            setFly(null);
            // store ? navigate("/store") : navigate("/IniciaSession")
            setClicked(false);
        }, 3000);
        }
    };

    //life-cycles:
    useEffect(() => {
        if (Array.isArray(categories) && !categories.length) {
            dispatch(get_categories()).then(({ payload }) => setCategories(payload.allCategories));
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) setStore(false);
    }, []);


    //component:
    return (
        <div className={s.component}>
        <h1 className={`${s.categoriesTitle} ${s[theme("categoriesTitle")]}`}>Encuentra lo que necesitas para despegar xD</h1>
        <div className={s.categories}>
            {
                Array.isArray(categories) && categories.length && categories.map((category, index) => (
                    <label
                        key={index}
                        ref={labelRef}
                        onClick={() => handleClick(index)}
                        className={index === fly ? s.flyingLabel : ""}
                        style={{
                            ...labelStyles(index),
                            "--initial-top": initialLabelCoords?.top + "px",
                            "--initial-left": initialLabelCoords?.left/10 + "px",
                        }}
                    >
                        {category.name}
                    </label>
                ))
            }
        </div>
        </div>
    );
}

export default CategorySection;
