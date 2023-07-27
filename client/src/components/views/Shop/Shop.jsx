import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_products_all, get_products_by_name, set_cart, sort_products, filter_product_by_category, filter_product_by_price, Dark_Mode, toggle_shopbag, set_highlight } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import 'rc-slider/assets/index.css';
import s from "./Shop.module.css";
import FilterBarShop from "./FilterBarShop"
import Modal from "../ventanaemergente/ventana";
import Footer from "../../bars/Footer/Footer";


//_________________________module_________________________
function Shop ( { isAtBottom, docWidth } ) {


    //global state:
    const dark = useSelector((state) => state.darkMode);
    const products = useSelector((state) => state.products);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);


    //states:
    const [loading, setLoading] = useState(false);
    const [tooltip, setToolip] = useState(null);

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //functions:
    const handledetailproduct = (id) => {
        navigate(`/ProductDetail/${id}`)
    }

    const found = (product) => {
        if (Array.isArray(cart)) return cart.find((item) => item.id === product.id)
    }

    const addToCart = async (item) => {
        if (!found(item)) {
            item.quantity = 1; //new property
            const oldCart = JSON.parse(localStorage.getItem("cart")) 
            oldCart.push(item)
            await localStorage.setItem("cart", JSON.stringify(oldCart))
            dispatch(set_cart())
        } else {
            await dispatch(set_highlight(item.id));
            dispatch(toggle_shopbag(true))
        }
        console.log(cart);
    };

    const popFromCart = async (product) => {
        if (product.quantity === 1) {
            const oldCart = JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id !== id) //convierte el JSON del carrito en un objeto js, en este caso, un array.
            await localStorage.setItem("cart", JSON.stringify(oldCart))
            dispatch(set_cart())
        } else if (product.quantity > 1) {
            product.quantity = product.quantity - 1;
            await localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(set_cart());
        }
    }

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
        for (let i = 0; i < cart.length; i++) {
            // Assuming each item has a price property
            total += +cart[i].price;
        }
        return total;
    };


    //life-cycles:
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (!token) navigate("/IniciaSession");
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            console.log("dispatch")
            if (products.length < 0) {
                (async () => {
                    console.log("dispatchAll    ")
                    setLoading(true);
                    await dispatch(get_products_all())
                    setLoading(false);
                })();
            }
        }
    }, [products])

    

    useEffect(() => {
        if (!loading) {
          const targetElement = document.querySelector(`.${s.sectionBanner}`);
          if (targetElement) {
            scrollToElement(targetElement, 0.8);
        }
        }
      }, [loading]);

      const scrollToElement = (element, duration) => {
        const targetPosition = element.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        const animateScroll = currentTime => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / (duration * 1000), 1);
          const easedProgress = easeInOutCubic(progress);
          const scrollY = startPosition + distance * easedProgress;
          window.scrollTo(0, scrollY);
    
          if (timeElapsed < duration * 1000) {
            requestAnimationFrame(animateScroll);
          }
        };
    
        const easeInOutCubic = t => {
          t /= 1 / 2;
          if (t < 1) return (1 / 2) * t * t * t;
          t -= 2;
          return (1 / 2) * (t * t * t + 2);
        };
    
        requestAnimationFrame(animateScroll);
      };
    
    // CART:
    useEffect(() => {
        (async () => {
            const cart = await localStorage.getItem("cart");
            if (!cart) {
                await localStorage.setItem("cart", "[]");
                dispatch(set_cart());
            }
        })()
    }, [])


    useEffect(() => {
        if (Array.isArray(products) && products.length >= 1) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [products])

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])

   
    // PAGINATION:
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentAllProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // indice:
    const pageNumbers = [];
    (() => {
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }
    })()

    //component:
    return (
        <main className={`${s.component} ${s[theme("component")]}`}>

        {/* BANNER */}        
            <section className={`${s.sectionBanner} ${s[theme("component")]}`}>
                {/* <img
                    className={`${s.bannerImg}`}
                    src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                    alt="mainBanner"
                /> */}
                <h1 className={`${s.mainTitle} ${s[theme("mainTitle")]}`}>
                    TIENDA DE PROGRAMMER'S GURU 
                </h1>

            </section>
        {/* SIDEBAR */}
            <div className={s.filterOrder}>
                <FilterBarShop/>                
            </div>

        {/* PAGINADO */}
        <div className={`${s.paginado}`} >
            <h2>Productos encontrados : {products.length}</h2>
        </div>

            <section className={`${s.section3}`}>

            {/* PRODUCTS */}

                {
                    loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <div className={`${s['productBox']}`}>
                        { 
                            currentAllProducts? currentAllProducts?.map((product, index) => {
                                if (product?.stock >= 0) { return (
                                    <div className={`${s.item} ${s[theme('item')]}`} onClick={() => handledetailproduct(product.id)} key={index}>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <div className={s.imgContainer}>
                                                <img  className={s["itemImage"]} src={product?.image}></img>
                                            </div>
                                            <div className={s.nameContainer}>
                                                <h1 className={s["name"]} >{product?.name}</h1>
                                            </div>
                                        </div>
                                        <div className={s.priceAndCart}>
                                            <h1 className={s["price"]}>${product?.price}</h1>
                                            <button
                                                className={found(product) ? s.checkButton : s.addButton}
                                                onMouseEnter={() => setToolip(product.id)}
                                                onMouseLeave={() => setToolip(null)}
                                                onClick={(event) => {addToCart(product); event.stopPropagation()}}
                                            >
                                                {
                                                    found(product) ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                        </svg>
                                                    )
                                                }
                                            </button>
                                            {
                                                tooltip === product.id && (
                                                    <span className={s["cartTooltip"]}>
                                                        {
                                                            found(product) 
                                                            ? "Producto agregado"
                                                            : "Añadir al carrito"
                                                        }
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                )} else return (
                                    <div className={`${s['item']}`} key={index}>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <div className={s.imgContainer}>
                                                <img className={s["itemImage"]} style={{filter: "grayscale(100%)"}} src={product?.image}></img>
                                            </div>
                                            <div className={s.nameContainer}>
                                                <h1 className={s["name"]} >{product?.name}</h1>
                                            </div>
                                        </div>
                                        <div className={s.priceAndCart}>
                                            <h1 className={s["price"]} style={{textDecoration:"line-through"}}>${product?.price}</h1>
                                            <p>No quendan existencias</p>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <Modal/>
                            )
                        }
                    </div>
                )
            }
            </section>

        {/* RESUMEN */}
            <section className={s.Resumen}>
                <h2>Resumen de compras</h2>
                {
                    cart?.length > 0 ? (
                        <>
                            <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.name} - ${item.price}
                                    <button onClick={() => removeFromCart(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                            </ul>
                            <p>Total: ${calculateTotal()}</p>
                        </>
                        ) : (
                        <p>Tu carrito de compras está vacío</p>
                    )
                }
            </section> 
            <div className={`${s.paginado}`} >
                {
                    pageNumbers?.map((number, index) => {
                        return (
                            <a key = {index} href = '#!' onClick = {() => {setCurrentPage(number)}}>
                                <div className={s.numberBox}>
                                    {number}
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            {
                docWidth < 750 ? (
                    <Footer/>
                ) : (
                    isAtBottom ? <Footer /> : null
                )
            }
            
        </main>
    )
}

export default Shop;