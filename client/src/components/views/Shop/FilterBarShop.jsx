import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from 'rc-slider';
import { get_products_all, get_products_by_name, get_categories, sort_products, filter_product_by_category, filter_product_by_price } from "../../../Redux/actions";

import s from "./FilterBarShop.module.css";

//_________________________module_________________________
const FilterBarShop =() =>{
   

    //global states:
    const productsCopy = useSelector((state) => state.productsCopy);
    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);
  
    console.log(productsCopy)
    console.log(products)

    //states:
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [isVisiblePrice, setIsVisiblePrice] = useState(false);
    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleSortByName, setIsVisibleSortByName] = useState(false);
    const [order, setOrder] = useState("")
    const [category, setCategory ]=useState("")
    
    //const:
    const dispatch = useDispatch();

    // const price = productsCopy.length && productsCopy.filter(product => product.price)

    const mayor = productsCopy.length && productsCopy.reduce((productoMayor, productoActual) => {
        return +productoActual?.price > +productoMayor?.price ? productoActual : productoMayor;
    });

    const menor = productsCopy.length && productsCopy.reduce((productoMayor, productoActual) => {
        return +productoActual?.price < +productoMayor?.price ? productoActual : productoMayor;
    });

    const mayorPrice = mayor?.price ? mayor?.price : 1000
    const menorPrice = menor?.price ? menor?.price : 0


    //functions:
    const toggleVisibilityPrice = () => {
        setIsVisiblePrice(!isVisiblePrice);
    }

    const toggleVisibilityCategory = () => {
        setIsVisibleCategory(!isVisibleCategory);
    }

    const toggleVisibilitySortByName = () => {
        setIsVisibleSortByName(!isVisibleSortByName);
    }

    const handlePriceChange = (values) => { 
        setPriceRange(values);
    };

    //______________________________________
    const handleSortChange = async (event) => {
        const value = event.target.value;
        await setOrder(value);
    };
    //_______________________________________

    const handle = async () => {
        await dispatch(get_products_all());
        order !== "" ? await dispatch(sort_products(order)):"";
        category !== "" ? await dispatch(filter_product_by_category(category)): "";
        await dispatch(filter_product_by_price(priceRange))
    }
    //_______________________________________

    const handleCategory = async (event) => {
        const value= event.target.value
        setCategory(value);
    }

    //_______________________________________

    // const handleFilter = () => {
    //     // dispatch(get_products_all());
    //     dispatch(filter_product_by_price(priceRange));
    // }

    // const sortProducts = (event) => {
    //     const value = event.target.value
    //     dispatch(sort_products(value));
    // }

    //life-cycles:
    useEffect(() => {
        console.log(priceRange)
    }, [priceRange])

    useEffect(() => {
        dispatch(get_categories())
    }, [dispatch])

    useEffect(() => {
        setPriceRange([mayorPrice, menorPrice])
    }, [mayorPrice, menorPrice])

    //component:
    return (
        <div className={`${s.sidebar}`}>
                <div className={s.option}>
                    <label onClick={toggleVisibilitySortByName}>ORDERNAR POR:</label>
                    { isVisibleSortByName && (
                        // value = {order}
                        <select onChange={handleSortChange}>
                            <option value="">Destacados</option>
                            <option value="ascendente">Ascendente</option>
                            <option value="descendente">Descendente</option>
                        </select>
                    )}
                </div> 
                <div className={s.option}> 
                    <label onClick={toggleVisibilityPrice}> POR PRECIO:</label>
                    {
                        true && (
                            <div className={`${s.filterPrice}`}>
                                <Slider
                                    className={`${s["filterPriceSlider"]}`}
                                    range
                                    min={menorPrice}
                                    max={mayorPrice}
                                    defaultValue={priceRange}
                                    onChange={handlePriceChange}
                                />
                                <div>Rango de Precio: ${priceRange[0]} - ${priceRange[1]}</div>
                            </div>  
                        ) 
                    }
                </div>
                <div className={s.option}>
                    <label onClick={toggleVisibilityCategory}>POR CATEGORÍA:</label>
                        <select onChange={handleCategory}>
                            <option value="">Categoría</option>
                            { categories.length &&
                                categories.map((category, index) => {
                                    return <option key={index} style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}} value={category.name}>{category.name}</option>
                                })
                            }
                        </select>
                        { 
                            isVisibleCategory && (
                                <div className={`${s.filterCategory}`}></div>
                            )
                        }
                </div>
                <button onClick={handle}>FILTRAR</button>
                <button onClick={() => {dispatch(get_products_all())}}>MOSTRAR TODOS</button>
        </div>
    )
}

export default FilterBarShop;