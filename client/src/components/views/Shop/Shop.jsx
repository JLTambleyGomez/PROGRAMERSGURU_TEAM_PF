import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { products } from "./products.json"

import Slider from 'rc-slider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import 'rc-slider/assets/index.css';
import s from "./Shop.module.css"

//_________________________module_________________________
function Shop () {

    //global state:
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [input, setInput] = useState("");
    const [isVisiblePrice, setIsVisiblePrice] = useState(false);
    const [isVisibleCategory, setIsVisibleCategory] = useState(false);
    const [isVisibleSortByName, setIsVisibleSortByName] = useState(false);
    const [isVisibleSortByPrice, setIsVisibleSortByPrice] = useState(false);

    const [cartTooltips, setCartTooltips] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isCartExpanded, setCartExpanded] = useState(false); // no se esta usando el estado.

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
      };

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
    
    const handleMouseEnter = (index) => {
        const newCartTooltips = [...cartTooltips];
        newCartTooltips[index] = true;
        setCartTooltips(newCartTooltips);
    };

    const handleMouseLeave = (index) => {
        const newCartTooltips = [...cartTooltips];
        newCartTooltips[index] = false;
        setCartTooltips(newCartTooltips);
    };

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
        setCartExpanded(true);
    };

    const removeFromCart = (index) => {
        const newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            setCartItems(newCartItems);
        if (newCartItems.length === 0) {
            setCartExpanded(false);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            // Assuming each item has a price property
            total += cartItems[i].price;
        }
        return +total;
    };

    //life-cycles:
    useEffect(() => {
        // Initialize the cartTooltips array with the same length as the number of items
        const initialCartTooltips = new Array(4).fill(false);
        setCartTooltips(initialCartTooltips);
    }, []);

    useEffect(() => {
        console.log(cartItems)
        console.log(cartTooltips);
    }, [cartItems, cartTooltips])

    //component:
    return (
        <main className={`${s.component}`}>
            <section className={`${s.section1}`}>
                <h1>EL LOGO VA AQUI</h1>
            </section>
            <section className={s.section2}>
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
            </section>
            <section className={`${s.section3}`}>
                <aside className={`${s.sidebar}`}>
                    <div className={`${s.filterOption}`}>
                        <label onClick={toggleVisibilityPrice}>FILTER BY PRICE</label>
                        {
                            isVisiblePrice && ( 
                                <div className={`${s.filterPrice}`}>
                                    <Slider
                                        className={`${s["filterPriceSlider"]}`}
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
                    <div className={`${s.filterOption}`}>
                        <label onClick={toggleVisibilityCategory}>FILTER BY CATEGORY</label>
                        {
                            isVisibleCategory && (
                                <div className={`${s.filterCategory}`}>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Libros</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Computadoras</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Almacenamiento</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Audio</span>
                                    <span style={{display: "flex", alignItems: "center", margin: "0.5rem 0"}}><input type = "checkbox"/>Accesorios</span>
                                </div>
                            )
                        }
                    </div>
                </aside>
                    <div className={`${s['productBox']}`}>
                        {
                            products.map((product, index) => {
                                return (
                                    <div className={s['item']}>
                                        <img className={s["itemImage"]} src={product.image}></img>
                                        <h1 className={s["name"]} >{product.name}</h1>
                                        <div className={s.priceAndCart}>
                                            <h1 className={s["price"]}>${product.price}</h1>
                                            <button 
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={() => handleMouseLeave(index)}
                                                onClick={() =>
                                                    addToCart({ name: product.name, price: product.price })}
                                            >
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                                className={s.cartIcon}
                                            />
                                            </button>
                                        </div>
                                        {cartTooltips[index] && (
                                            <span className={s["cartTooltip"]}>Añadir al carrito</span>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
            </section>
            <section className={s.section4}>
                <h2>Resumen de compras</h2>
                {cartItems.length > 0 ? (
                    <>
                        <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                                <button onClick={() => removeFromCart(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                        </ul>
                        <p>Total: ${calculateTotal()}</p>
                    </>
                    ) : (
                    <p>Tu carrito de compras está vacío</p>
                )}
            </section>

        </main>
    )
}

export default Shop;


//   return (
//     <div className={styles.container}>
//       <div className={`${styles.h1} ${styles[elementClasses.h1]}`}>
//         <h1>Encuentra lo que necesites para programar de la mejor manera</h1>
//       </div>
//       <div className={`${styles.containerItems} ${isCartExpanded ? styles.expanded : ""}`}>
//         <div className={styles.item}>
//           <figure>
//             <img
//               src="https://http2.mlstatic.com/D_NQ_NP_741120-MLA52367887280_112022-O.webp"
//               alt="producto"
//             />
//           </figure>
//           <div className={styles.infoProduct}>
//             <h2>Laptop Computer</h2>
//             <div className={styles.priceAndCart}>
//               <p className={styles.price}>$1000 </p>
//               <button
//                 onMouseEnter={() => handleMouseEnter(0)}
//                 onMouseLeave={() => handleMouseLeave(0)}
//                 onClick={() =>
//                   handleAddToCart({ name: "Laptop Computer", price: 1000 })
//                 }
//               >
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className={styles.cartIcon}
//                 />
//               </button>
//             </div>
//             {cartTooltips[0] && (
//               <span className={styles.cartTooltip}>Añadir al carrito</span>
//             )}
//           </div>
//         </div>
//         <div className={styles.item}>
//           <figure>
//             <img
//               src="https://http2.mlstatic.com/D_NQ_NP_615006-MLU69482630056_052023-O.webp"
//               alt="producto"
//             />
//           </figure>
//           <div className={styles.infoProduct}>
//             <h2>High-resolution Monitor</h2>
//             <div className={styles.priceAndCart}>
//               <p className={styles.price}>$1000 </p>
//               <button
//                 onMouseEnter={() => handleMouseEnter(1)}
//                 onMouseLeave={() => handleMouseLeave(1)}
//                 onClick={() =>
//                   handleAddToCart({
//                     name: "High-resolution Monitor",
//                     price: 1000,
//                   })
//                 }
//               >
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className={styles.cartIcon}
//                 />
//               </button>
//             </div>
//             {cartTooltips[1] && (
//               <span className={styles.cartTooltip}>Añadir al carrito</span>
//             )}
//           </div>
//         </div>
//         <div className={styles.item}>
//           <figure>
//             <img
//               src="https://http2.mlstatic.com/D_NQ_NP_876249-MLA51700399267_092022-O.webp"
//               alt="producto"
//             />
//           </figure>
//           <div className={styles.infoProduct}>
//             <h2>Mechanical Keyboard</h2>
//             <div className={styles.priceAndCart}>
//               <p className={styles.price}>$1000 </p>
//               <button
//                 onMouseEnter={() => handleMouseEnter(2)}
//                 onMouseLeave={() => handleMouseLeave(2)}
//                 onClick={() =>
//                   handleAddToCart({ name: "Mechanical Keyboard", price: 1000 })
//                 }
//               >
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className={styles.cartIcon}
//                 />
//               </button>
//             </div>
//             {cartTooltips[2] && (
//               <span className={styles.cartTooltip}>Añadir al carrito</span>
//             )}
//           </div>
//         </div>
//         <div className={styles.item}>
//           <figure>
//             <img
//               src="https://http2.mlstatic.com/D_NQ_NP_989281-MLA49016297014_022022-O.webp"
//               alt="producto"
//             />
//           </figure>
//           <div className={styles.infoProduct}>
//             <h2>Ergonomic Mouse</h2>
//             <div className={styles.priceAndCart}>
//               <p className={styles.price}>$1000 </p>
//               <button
//                 onMouseEnter={() => handleMouseEnter(3)}
//                 onMouseLeave={() => handleMouseLeave(3)}
//                 onClick={() =>
//                   handleAddToCart({ name: "Ergonomic Mouse", price: 1000 })
//                 }
//               >
//                 <FontAwesomeIcon
//                   icon={faShoppingCart}
//                   className={styles.cartIcon}
//                 />
//               </button>
//             </div>
//             {cartTooltips[3] && (
//               <span className={styles.cartTooltip}>Añadir al carrito</span>
//             )}
//           </div>
//         </div>
//       </div>
//       <hr/>
//       <div className={styles.cart}>
//         <h2>Resumen de compras</h2>
//         {cartItems.length > 0 ? (
//           <>
//             <ul>
//               {cartItems.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - ${item.price}
//                   <button onClick={() => handleRemoveFromCart(index)}>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <p>Total: ${calculateTotal()}</p>
//           </>
//         ) : (
//           <p>Tu carrito de compras está vacío</p>
//         )}
//       </div>
//     </div>
//   );
// };


// export default Tienda;
