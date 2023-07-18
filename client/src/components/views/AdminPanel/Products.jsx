import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all, post_Products, delete_Products, clearMessage, put_Products } from "../../../Redux/actions";

import styles from "./AdminPanel.module.css";

//_________________________module_________________________
function Products () {

    //global state: 
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    const products = useSelector((state) => state.products);
    
    //const:
    const dispatch = useDispatch();

    const[postProduct, setPostProduct] = useState(false)
    const[messagePost, setMessagePost] = useState(false)
    const[newProduct, setNewProduct] = useState({name:'', price:'', description:'', image:'', category:'',stock:''})
    const[errorProduct, setErrorProduct] = useState({name:'', price:'', description:'', image:'', category:'',stock:''})

    const handleProductDelete =(id)=>{
        try {
            dispatch (delete_Products(id))
            dispatch(get_products_all());
        } catch (error) {
            console.log("error");
        }
    }

    ///valida los cambios en los inputs
    const handleChangeProductForm = (event) => {
        const name = event.target.name;
        const value = event.target.value

        console.log(name)
        console.log(value)

        setNewProduct({...newProduct, [name]: value})
        setErrorProduct(validateProduct({...newProduct, [name]: value}))
    }

    //validacion del formulario
    const validateProduct = (form) => {
        const error = {}

        if(!form.name.length) error.name = 'Debe agregar un nombre válido'
        else if(form.name.length) error.name = ''

        if(!form.description.length) error.description = 'Debe agregar una descripción válida'
        else if(form.description.length) error.description = ''

        if(form.price < 0) error.price = 'Debe ingresar un precio válido'
        else if(form.price.length) error.price = ''
        
        if(!form.image.length) error.image = 'Debe ingresar una imagen'
        else if(form.image.length) error.image = ''
        
        if(!form.category.length) error.category = 'Debe ingresar una categoria'
        else if(form.category.length) error.category = ''
        
        if(form.stock < 0) error.stock = 'Debe ingresar el stock'
        else if(form.stock.length) error.stock = ''
        
        return error
    }
        
    //cambia el estado para desplegar el formulario
    const handlePostProducts = () => {
        setPostProduct(true)
    }


    //Postea el producto en la db
    const handleProductSubmit = (event) => {
        event.preventDefault()
        
        dispatch(post_Products(newProduct))
        dispatch(get_products_all());
        setMessagePost(true)
        setPostProduct(false)
        
    }

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_products_all());

        return () => {                // return ocupar para hacer algo en el desmontaje          
            dispatch(clearMessage()); // limpiar 
        }
    }, [dispatch]);



    //component:
    return (

            <div className={styles.contain} >
            <div>
                 </div>
                <section >
                  

                    <div >
                        <h2>Productos</h2>
                        {
                            postProduct 
                            ? 
                                (<>
                                    <form>
                                        <div>
                                            <label htmlFor="name">Nombre: </label> 
                                            <input name="name" value={newProduct.name} onChange={handleChangeProductForm}/>
                                            {errorProduct.name && (<span>{errorProduct.name}</span>)}
                                        </div>

                                        <div>
                                            <label  htmlFor="description">Descripción: </label> 
                                            <input name='description' value={newProduct.description} onChange={handleChangeProductForm} />
                                            {errorProduct.description && (<span>{errorProduct.description}</span>)}
                                        </div>

                                        <div>
                                            <label htmlFor="price">Precio: </label> 
                                            <input name='price' value={newProduct.price} onChange={handleChangeProductForm} type="number" />
                                            {errorProduct.price && (<span>{errorProduct.price}</span>)}
                                        </div>

                                        <div>
                                            <label htmlFor="image">Imagen: </label> 
                                            <input name='image'value={newProduct.image} onChange={handleChangeProductForm} />
                                            {errorProduct.image && (<span>{errorProduct.image}</span>)}
                                        </div>

                                        <div>
                                            <label htmlFor="category">Categoria: </label> 
                                            <input name='category' value={newProduct.category} onChange={handleChangeProductForm} />
                                            {errorProduct.category && (<span>{errorProduct.category}</span>)}
                                        </div>

                                        <div>
                                            <label htmlFor="stock">Stock: </label> 
                                            <input name='stock' value={newProduct.stock} onChange={handleChangeProductForm} type="number" />
                                            {errorProduct.stock && (<span>{errorProduct.stock}</span>)}
                                        </div>
                                        <button onClick={handleProductSubmit}>Postear Producto</button>
                                    </form>
                                
                                </>) 
                            : (<button onClick={handlePostProducts}>Agregar productos</button>) }
                        {messagePost && (<span>Se posteo con éxito, creo...</span>)}
                        <div >
                            {
                                products?.map((product, index) => {
                                    return (
                                        <span className={`${styles.category}`}>
                                            <label key={index}>
                                              <p>{product.name}</p>
                                               <p>{product.id}</p> 
                                               <p>{product.price}</p> 
                                               <p>{product.category}</p> 
                                               
                                               </label>
                                            <button  onClick={() => handleProductDelete(product.id)}>X</button>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
              
              </div>
    );
};

export default Products;


