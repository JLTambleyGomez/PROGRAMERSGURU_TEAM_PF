import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { filter_product_by_category, get_categories } from "../../../Redux/actions";

import s from "./CategorySection.module.css";

//_________________________module_________________________
function CategorySection ( { storeRef } ) {

    
    //local state:
    const [categories, setCategories] = useState([]);
    const [store, setStore] = useState(true);
    const [fly, setFly] = useState(null);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
    const [labelPosition, setLabelPosition] = useState({ top: 0, left: 0});

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const labelRef = useRef(null);

    
    //functions:
    const labelStyles = (index) => {
        if (fly === index) {
          return {
            top: buttonPosition.top + "px",
            left: buttonPosition.left + "px",
            transform: "rotate(360deg)", // Add the rotation here
          }
      };
    }

    const handleClick = (index) => {
        if (labelRef.current) {
            const labelCoords = labelRef.current.getBoundingClientRect(); // Get label coordinates
            console.log("Label coordinates:", labelCoords);
            setLabelPosition({
                top: labelCoords.top,
                left: labelCoords.left
            })
        }

        const buttonCoords = storeRef.current.getBoundingClientRect();
        // console.log(buttonCoords)
        setButtonPosition({
            top: buttonCoords.top,
            left: buttonCoords.left,
          });

        setFly(index);
        const timer = setTimeout(() => {   
            setFly(null);
            store ? navigate("/store") : navigate("/IniciaSession")
        }, 3000)
    }


    //life-cycles:
    useEffect(() => {
        if (Array.isArray(categories) && !categories.length) dispatch(get_categories())
        .then(({ payload }) => setCategories(payload.allCategories));
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) setStore(false)
    }, [])


    //component:
    return (
        <div className={s.component}>
            <h1>Encuentra lo que necesitas para programar a lo grande !</h1>
            <div className={s.categories}>
                {
                    Array.isArray(categories) && categories.length && categories.map((category, index) => (
                        <label key={index} ref={labelRef} onClick={() => handleClick(index)} className={index === fly ? s.flyingLabel : ""}
                            style={labelStyles(index)}
                        >
                            {category.name}
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default CategorySection;