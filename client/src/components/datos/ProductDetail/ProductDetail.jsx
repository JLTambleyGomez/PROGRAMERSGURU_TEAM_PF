import styles from "./ProductDetail.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { get_User_By_Email } from "../../../Redux/actions";
import {getProductByIdRequest} from "../../../axiosRequests/axiosRequests"
import { useDispatch,useSelector } from "react-redux";

//_________________________module_________________________
function ProductDetail() {

  //REDUX
  const user = useSelector((state)=>state.user);
  const [product, setProduct] = useState(null);
  
  //hooks
  const { id } = useParams(); 
  const dispatch=useDispatch();
  
  //life-cycles:
    useEffect(() => {  
        const email = localStorage.getItem("email");
        (async () => {
            if (!user) await get_User_By_Email(email);
            if (!product) {
                const producto = await getProductByIdRequest(id)
                console.log(producto);
                setProduct(producto);
            }
        })()
    }, [id]); 


  //component:
  return (
    <div className={`${styles.container}`}>
      { (product && product?.name) ? (
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
