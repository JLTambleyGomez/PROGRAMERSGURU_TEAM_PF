import styles from "./ProductDetail.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {getProductByIdRequest} from '../../../axiosRequests/axiosRequests'

//_________________________module_________________________
function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  
  //hace la peticion con una axion request
  const getProductById = async () => {
    try {
       const productDB = await getProductByIdRequest(id)
       console.log(productDB)
       setProduct(productDB)
      
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    getProductById()
  }, [id]); 

 
  return (
    <div className={`${styles.container}`}>
      {Object(product).keys.length > 0 ? (
        <div>
          <h1 className={`${styles.title}`}>Detalles del Producto</h1>
          <div className={styles.productInfo}>
          <div className={`${styles.productImage}`}>
              <img src={product?.image} alt={product?.name}/>
            </div>
            <div className={styles?.description}>
              <h2 className={styles?.descriptionh2}>{product?.name}</h2>
              <p>{product?.description}</p>
              <p>Price: ${product?.price}</p>
              <p>Category: {product?.category}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default ProductDetail;
