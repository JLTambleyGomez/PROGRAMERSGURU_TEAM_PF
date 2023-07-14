import styles from "./ProductDetail.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';



function ProductDetail() {
  const [product, setProduct] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${id}`);
      setProduct(response.data);
    } catch (error){
      window.alert("algo fallo");
    } 
   }
   
  return (
    <div className={styles.container}>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <div>
          <img src={product.image} alt={product.name} />
          </div>
          <p>Category: {product.category}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div >
          <>
            <h1 className={styles.title}>Detalles del Producto </h1>
           
              <h1 className={styles.total}>TOTAL :</h1>
            <span>
              {/* sumar */}
            </span>
          </>
        </div>
    </div>
  );
};
export default ProductDetail;
