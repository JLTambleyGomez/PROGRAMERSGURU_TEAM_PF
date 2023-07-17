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

    console.log(products)

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handleProductPost = (event) => {
        event.preventDefault();
        // dispatch(post_Products())
        
    }



    const handleProductDelete =(id)=>{
        try {
            dispatch (delete_Products(id))
            dispatch(get_products_all());
        } catch (error) {
            console.log("error");
        }
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
                <section className={`${styles.Panel}`}>
                  

                    <div className={`${styles.categoriesContainer}`}>
                        <h2>Productos</h2>
                        <div className={`${styles.categoriesBox}`}>
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
                                            <button className={`${styles.deleteCategoryButton}`} onClick={() => handleProductDelete(product.id)}>X</button>
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


