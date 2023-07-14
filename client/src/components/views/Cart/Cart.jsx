// import global storage con los productos agregados
import { useState, useEffect } from "react"


//_________________________module_________________________
function Cart () {

    //global state:
    const [cart, setCart] = useState([]);

    const getCart = async () => {
        const cart = await localStorage.getItem("cart")
        if (!cart) {
            await localStorage.setItem("cart", "[]")
        }
        setCart(JSON.parse(cart))
    }

    //life-cycles:
    useEffect(() => {
        getCart()
    }, [])

    //component:
    return (
        <div style={{marginTop: "10vh"}}>
            TU CARRITO DE COMPRAS
            <div>
                <h1>{cart.length}</h1>
                {cart?.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(index)}>
                            remove
                        </button>
                    </li>
                ))}
                {/* mapear el estado global y renderizar una lista */}
            </div>
            <span>
                <h1>TOTAL</h1>
                {/* sumar */}
            </span>
        </div>
    )
}

export default Cart;