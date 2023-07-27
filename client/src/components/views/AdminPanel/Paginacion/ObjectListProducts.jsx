import s from './Products.module.css'
import styles from "../Courses.module.css";
import { useState } from "react";
import Paginacion from "./Paginacion";

function ObjectListProducts ({objects, name, handleProductDelete, handleModificarProducto}) {
    const [currentPage, setCurrentPage] = useState(1);


    const ObjectsPerPage = 5;
    const numOfObjects = objects.length;
    const lastObj = currentPage * ObjectsPerPage;
    const firstObj = lastObj - ObjectsPerPage;

    const filtered = objects.filter(obj => obj.name)
    console.log(objects)

    return (
        <div className={s.component}>
        <div className={s.header}>
            <div className={s.id}>ID</div>
            <div className={s.image}>Imagen</div>
            <div className={s.name}>Nombre</div>
            <div className={s.category}>Categoria</div>
            <div className={s.stock}>Stock</div>
            <div className={s.price}>Precio</div>
            <div className={s.action}>Acciones</div>
        </div>
<>
                {filtered?.slice(firstObj, lastObj).map((obj) => {
                    return (
                    
                    <div key={obj.id} className={s.fila}>
                        <div className={s.id}>{obj.id}</div>
                        <div className={s.image}>
                            <img src={obj.image} alt="" />
                        </div>
                        <div className={s.name}>{obj.name}</div>
                        <div className={s.category}>{obj?.Category?.name || "Sin categoría"}</div>
                        <div className={s.stock}>{obj.stock}</div>
                        <div className={s.price}>${obj.price}</div>
                      
                        <div className={s.action}>

                            <button  onClick={() =>handleModificarProducto(obj.id)}className={styles.modificarButton}><svg xmlns="http://www.w3.org/2000/svg" className={styles.mod} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path></svg>
                            </button>
                            <button  onClick={() =>handleProductDelete(obj.id)} className={styles.deleteButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/></svg>
                            </button>
                        </div>

                    </div>
                        
                    );
                })}
            </>
            <Paginacion
                ObjectsPerPage={ObjectsPerPage}
                numOfObjects={numOfObjects}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
       
    )
}

export default ObjectListProducts; 