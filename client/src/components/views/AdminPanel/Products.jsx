import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_products_all,
    post_Product,
    delete_Products,
    clearMessage,
    put_Products,
} from "../../../Redux/actions";
import { validateProduct } from "./validate";
import styles from "./AdminPanel.module.css";

//_________________________module_________________________
function Products() {
    //global state:
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    const products = useSelector((state) => state.products);

    //const:
    const dispatch = useDispatch();

    //estados locales
    const [postProduct, setPostProduct] = useState(false);
    const [modificarProduct, setModificarProduct] = useState(false);
    const [idProduct, setIdProduct] = useState(null);
    const [messagePost, setMessagePost] = useState("");
    const [change, setChange] = useState(false);
    const [product, setProduct] = useState({});
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        stock: "",
    });
    const [errorProduct, setErrorProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        stock: "",
    });

    const handleProductDelete = (id) => {
        try {
            dispatch(delete_Products(id));
            dispatch(get_products_all());
        } catch (error) {
            console.log("error");
        }
    };

    ///valida los cambios en los inputs
    const handleChangeProductForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setNewProduct({ ...newProduct, [name]: value });
        if (postProduct)
            setErrorProduct(validateProduct({ ...newProduct, [name]: value }));
        // <--- valida los errores solo cuando lo posteas
        else
            setErrorProduct({
                name: "",
                price: "",
                description: "",
                image: "",
                category: "",
                stock: "",
            });
        setChange(true);
    };

    //cambia el estado para desplegar el formulario y postearlo
    const handlePostProducts = () => {
        setPostProduct(true);
        setModificarProduct(false);
    };

    //cambia el estado para desplegar el formulario y modificarlo
    const handleModificarProducto = (event) => {
        const id = event.target.value;

        const productModificar = products.find((p) => p.id === +id);

        setProduct(productModificar);

        setModificarProduct(true);

        setPostProduct(false);
        setIdProduct(id);
    };

    //Postea el producto en la db
    const handleProductSubmit = (event) => {
        event.preventDefault();
        try {
            if (
                errorProduct.name ||
                errorProduct.description ||
                errorProduct.genre ||
                errorProduct.platforms ||
                errorProduct.released ||
                errorProduct.rating
            )
                return setMessagePost("Revise los datos");

            if (
                !newProduct.name ||
                !newProduct.description ||
                !newProduct.genre ||
                !newProduct.platforms ||
                !newProduct.released ||
                !newProduct.rating
            )
                setMessagePost("Debe ingresar los datos");
            if (change) {
                if (postProduct) {
                    dispatch(post_Product(newProduct));
                    setPostProduct(false);
                    setMessagePost(true);
                    dispatch(get_products_all());
                }
                if (modificarProduct) {
                    dispatch(put_Products(idProduct, newProduct));
                    setModificarProduct(false);
                    dispatch(get_products_all());
                }
                dispatch(get_products_all());
                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    category: "",
                    stock: "",
                });
                setNewProduct({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    category: "",
                    stock: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseForm = () => {
        setModificarProduct(false);
        setPostProduct(false);
        setChange(false);
        setMessagePost("");
        setErrorProduct({
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            stock: "",
        });
        setNewProduct({
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            stock: "",
        });
    };

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());

        if (!products.length) dispatch(get_products_all());

        return () => {
            // return ocupar para hacer algo en el desmontaje
            dispatch(clearMessage()); // limpiar
        };
    }, [dispatch]);

    //component:
    return (
        <div className={styles.contain}>
            <div></div>
            <section>
                <div>
                    <h2>Productos</h2>
                    {postProduct || modificarProduct ? (
                        <>
                            <button onClick={handleCloseForm}>X</button>
                            <h2>
                                {postProduct
                                    ? "Añadir un nuevo producto"
                                    : "Editar producto"}
                            </h2>
                            {messagePost && <p>{messagePost}</p>}
                            <form>
                                <div>
                                    {modificarProduct && (
                                        <p>
                                            Debe ingresar al menos un dato a
                                            cambiar
                                        </p>
                                    )}
                                    <label htmlFor="name">Nombre: </label>
                                    <input
                                        name="name"
                                        value={newProduct.name}
                                        onChange={handleChangeProductForm}
                                        placeholder={
                                            modificarProduct ? product.name : ""
                                        }
                                    />
                                    {errorProduct.name && (
                                        <span>{errorProduct.name}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description">
                                        Descripción:{" "}
                                    </label>
                                    <input
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleChangeProductForm}
                                        placeholder={
                                            modificarProduct
                                                ? product.description
                                                : ""
                                        }
                                    />
                                    {errorProduct.description && (
                                        <span>{errorProduct.description}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="price">Precio: </label>
                                    <input
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleChangeProductForm}
                                        type="number"
                                        placeholder={
                                            modificarProduct
                                                ? product.price
                                                : ""
                                        }
                                    />
                                    {errorProduct.price && (
                                        <span>{errorProduct.price}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="image">Imagen: </label>
                                    <input
                                        name="image"
                                        value={newProduct.image}
                                        onChange={handleChangeProductForm}
                                        placeholder={
                                            modificarProduct
                                                ? product.image
                                                : ""
                                        }
                                    />
                                    {errorProduct.image && (
                                        <span>{errorProduct.image}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="category">
                                        Categoria:{" "}
                                    </label>
                                    <input
                                        name="category"
                                        value={newProduct.category}
                                        onChange={handleChangeProductForm}
                                        placeholder={
                                            modificarProduct
                                                ? product.category
                                                : ""
                                        }
                                    />
                                    {errorProduct.category && (
                                        <span>{errorProduct.category}</span>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="stock">Stock: </label>
                                    <input
                                        name="stock"
                                        value={newProduct.stock}
                                        onChange={handleChangeProductForm}
                                        type="number"
                                        placeholder={
                                            modificarProduct
                                                ? product.stock
                                                : ""
                                        }
                                    />
                                    {errorProduct.stock && (
                                        <span>{errorProduct.stock}</span>
                                    )}
                                </div>
                                <button
                                    className={styles.button}
                                    onClick={handleProductSubmit}
                                >
                                    {postProduct
                                        ? "Postear Producto"
                                        : "Editar producto"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <button
                            className={styles.button}
                            onClick={handlePostProducts}
                        >
                            Agregar productos
                        </button>
                    )}
                    {message && <span>{message}</span>}
                    <div>
                        {postProduct ||
                            (!modificarProduct &&
                                products.length &&
                                products.map((product, index) => {
                                    return (
                                        <span
                                            className={`${styles.category}`}
                                            key={index}
                                        >
                                            <button
                                                className={styles.button}
                                                onClick={
                                                    handleModificarProducto
                                                }
                                                value={product.id}
                                            >
                                                Modificar producto
                                            </button>
                                            <label key={index}>
                                                <p>{product.name}</p>
                                                <p>{product.id}</p>
                                                <p>{product.price}</p>
                                                <p>{product.category}</p>
                                            </label>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleProductDelete(
                                                        product.id
                                                    )
                                                }
                                            >
                                                X
                                            </button>
                                        </span>
                                    );
                                }))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Products;
