import { useState, useEffect } from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import s from "./Shop.module.css"

//_________________________module_________________________
function Compras () {

    //states:
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [input, setInput] = useState("");
    const [isVisiblePrice, setIsVisiblePrice] = useState(false);
    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleSortByName, setIsVisibleSortByName] = useState(false);
    const [isVisibleSortByPrice, setIsVisibleSortByPrice] = useState(false);

    const electronicProducts = [
        {
          name: "Laptop or Desktop Computer",
          price: "$1000 and up",
          image: "laptop.jpg",
          description: "A powerful computer for programming and development tasks.",
        },
        {
          name: "High-resolution Monitor",
          price: "$200 and up",
          image: "monitor.jpg",
          description: "A large display with high resolution for better productivity.",
        },
        {
          name: "Mechanical Keyboard",
          price: "$100 and up",
          image: "keyboard.jpg",
          description: "A keyboard with mechanical switches for a comfortable typing experience.",
        },
        {
          name: "Ergonomic Mouse",
          price: "$50 and up",
          image: "mouse.jpg",
          description: "A mouse designed to provide comfort and reduce strain during long hours of work.",
        },
    ];

    //functions:
    const syncInput = (event) => {
        const { value } = event.target;
        setInput(value);
    }

    const toggleVisibilityPrice = () => {
        setIsVisiblePrice(!isVisiblePrice);
    }

    const toggleVisibilityCategory = () => {
        setIsVisibleCategory(!isVisibleCategory);
    }

    const toggleVisibilitySortByName = () => {
        setIsVisibleSortByName(!isVisibleSortByName);
    }

    const toggleVisibilitySortByPrice = () => {
        setIsVisibleSortByPrice(!isVisibleSortByPrice);
    }

    const handlePriceChange = (values) => {
        setPriceRange(values);
    };

    const addToCart = () => {
        // crear un action
    }

    //component:
    return (
        <div className="comprasContainer">
            <div className="comprasCover">
                <h1>EL LOGO VA AQUI</h1>
            </div>
            <div className="comprasSection1">
                <div className="comprasFilters">
                    <div className="comprasFiltersFilter">
                        <label onClick={toggleVisibilityPrice}>FILTER BY PRICE</label>
                        {
                            isVisiblePrice && (
                                <div className="comprasFilterFilterOptionPrice">
                                    {/* <input type="range" min={10} step={10}></input> */}
                                    <Slider
                                        className="comprasFilterFilterOptionPrice1"
                                        range
                                        min={0}
                                        max={1000}  
                                        defaultValue={priceRange}
                                        onChange={handlePriceChange}
                                    />
                                    <div>
                                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="comprasFiltersFilter">
                        <label onClick={toggleVisibilityCategory}>FILTER BY CATEGORY</label>
                        {
                            isVisibleCategory && (
                                <div className="comprasFiltersFilterOptionCategory">
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input className="comprasFiltersFilterOptionCategoryInput" type = "checkbox"/>Books</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input className="comprasFiltersFilterOptionCategoryInput" type = "checkbox"/>Computers</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input className="comprasFiltersFilterOptionCategoryInput" type = "checkbox"/>Storage</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input className="comprasFiltersFilterOptionCategoryInput" type = "checkbox"/>Audio</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input className="comprasFiltersFilterOptionCategoryInput" type = "checkbox"/>Accesories</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="comprasSection1-2">
                    <span className="comprasSection1-2Order">
                        <div>
                            <h1 onClick={toggleVisibilitySortByName}>ORDERNAR POR NOMBRE</h1>
                            {
                                isVisibleSortByName && (
                                    <ul>
                                        <li>Ascendente</li>
                                        <li>Descendente</li>
                                    </ul>
                                )
                            }
                        </div>
                        <div>
                            <h1 onClick={toggleVisibilitySortByPrice}>ORDENAR POR PRECIO</h1>
                            {
                                isVisibleSortByPrice && (
                                    <ul>
                                        <li>Menor a mayor</li>
                                        <li>Mayor a menor</li>
                                    </ul>
                                )
                            }
                        </div>
                        <input value={input} onChange={syncInput}></input>
                        <button>search</button>
                    </span>
                    <div className="comprasSection1-2Products">
                        {
                            electronicProducts.map((product) => {
                                return (
                                    <div className="comprasSection1-2Card">
                                        <img src = {product.image}></img>
                                        <h1>{product.name}</h1>
                                        <h1>{product.price}</h1>
                                        <button>AGREGAR AL CARRITO</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compras;