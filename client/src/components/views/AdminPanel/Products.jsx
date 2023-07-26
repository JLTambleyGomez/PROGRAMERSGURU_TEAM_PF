import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_products_all,
    post_Product,
    delete_Products,
    clearMessage,
    put_Products,
    get_categories
} from "../../../Redux/actions";
import { validateProduct } from "./validate";
import styles from "./Courses.module.css";
import { SubirImagenDeProducto } from "./SubirImagenDeProducto";
import { Table } from "react-bootstrap";
//_________________________module_________________________
function Products() {
    
    //global state:
    const message = useSelector((state) => state.message);
    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories);

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
        categoryId: "",
        stock: "",
    });
    const [errorProduct, setErrorProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        categoryId: "",
        stock: "",
    });

    const handleProductDelete = async (id) => {
        try {
            await dispatch(delete_Products(id));
            await dispatch(get_products_all());
        } catch (error) {
            console.log("error");
        }
    };

    ///valida los cambios en los inputs
    const handleChangeProductForm = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setNewProduct((prevProduct) => ({
          ...prevProduct, 
          [name]: (name === 'image' && localStorage.getItem('urlNewProductImage')) || value,
        }))

        if (postProduct) setErrorProduct(validateProduct({ ...newProduct, [name]: value }));
        // <--- valida los errores solo cuando lo posteas
        else
            setErrorProduct({
                name: "",
                price: "",
                description: "",
                image: "",
                categoryId: "",
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
    const handleModificarProducto = (productId) => {
        const productModificar = products.find((p) => p.id === productId);
      
        setProduct(productModificar);
        setModificarProduct(true);
        setPostProduct(false);
        setIdProduct(productId);
      };
      

    //Postea el producto en la db
    const handleProductSubmit = (event) => {
        event.preventDefault();
        try {
            if (
                errorProduct.name ||
                errorProduct.description ||
                errorProduct.price ||
                errorProduct.image ||
                errorProduct.categoryId ||
                errorProduct.stock
            )
                return setMessagePost("Revise los datos");


            if (change) {
                if (postProduct) {
                    if (
                        !newProduct.name ||
                        !newProduct.description ||
                        !newProduct.price ||
                        !newProduct.image ||
                        !newProduct.categoryId ||
                        !newProduct.stock
                    )
                        return setMessagePost("Debe ingresar los datos");
                        
                    dispatch(post_Product(newProduct)).then(() =>
                        dispatch(get_products_all())
                    );
                    setPostProduct(false);
                    setMessagePost(true);
                }
                if (modificarProduct) {
                    dispatch(put_Products(idProduct, newProduct)).then(() =>
                        dispatch(get_products_all())
                    );
                    setModificarProduct(false);
                }

                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    categoryId: "",
                    stock: "",
                });
                setNewProduct({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    categoryId: "",
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
            categoryId: "",
            stock: "",
        });
        setNewProduct({
            name: "",
            price: "",
            description: "",
            image: "",
            categoryId: "",
            stock: "",
        });
    };

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_products_all());
        dispatch(get_categories())
    
        //posibilidad para eliminar la funcion de desmontaje y reemplazarla con el useEffect:
        return () => {
            // return ocupar para hacer algo en el desmontaje
            dispatch(clearMessage()); // limpiar
        };
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })()
    }, [dispatch])


    //component:
    return (
        <div className={styles.contain}>
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
                        <p>Debe ingresar al menos un dato a cambiar</p>
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
                      <label htmlFor="description">Descripción: </label>
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
                      <SubirImagenDeProducto handleChangeProductForm={handleChangeProductForm} name={modificarProduct ? newProduct?.name : product?.name} />
                    </div>
    
                    <div>
                      <label htmlFor="category">Categoria: </label>
                      <select onChange={(event) => setNewProduct({ ...newProduct, categoryId: event.target.value })}>
                        <option>Categoría</option>
                        {
                          categories.allCategories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                          ))
                        }
                      </select>
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
                <h2>Tabla de Productos</h2>
                <Table className="table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>

                    {products.length &&  products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                          <button
                            className={styles.button}
                            onClick={() =>
                              handleModificarProducto(product.id)
                            }
                          >
                            Modificar producto
                          </button>
                          <button
                            className={styles.button}
                            onClick={() =>
                              handleProductDelete(product.id)
                            }
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </div>
      );
    }
    
export default Products;