import styles from "./ProductDetail.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${id}`);
      setProduct(response.data);
    } catch (error) {
    }
  }
  console.log(product)

  return (
    <div className={`${styles.container}`}>
      {product ? (
        <div>
          <h1 className={`${styles.title}`}>Detalles del Producto</h1>
          <div className={styles.productInfo}>
          <div className={`${styles.productImage}`}>
              <img src={product.image} alt={product.name}/>
            </div>
            <div className={styles.description}>
              <h2 className={styles.descriptionh2}>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
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
