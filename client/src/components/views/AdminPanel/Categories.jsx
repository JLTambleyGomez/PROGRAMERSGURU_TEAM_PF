import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import {
    get_categories, postCategory, deleteCategory, clearMessage
} from "../../../Redux/actions";
import { validate } from "./validate";


import styles from "./Categories.module.css";


//_________________________module_________________________
const Categories = () => {
    
    // global state:
    const categories = useSelector((state) => state.categories);
    const dark = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    console.log(categories)

    
    // states:
    const [inputCategory, setInputCategory] = useState({ name: "" });
    const [error, setError] = useState({});
    const [backmessage, setbackmessage] = useState("");


    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const hadleInputChange = (event) => {
        setbackmessage("");
        const { value } = event.target;
        setInputCategory({ name: value });
    };

    const handlePostCategories = async (event) => {
        event.preventDefault();

        try {
            await dispatch(
                postCategory(inputCategory)
            );
            setInputCategory({ name: "" });
            await dispatch(get_categories());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory1 = async (id) => {
        try {
            await dispatch(deleteCategory(id));
            await dispatch(get_categories());
        } catch (error) {
            console.log("error");
        }
    };


    //life-cycles:

    useEffect(() => {
        if(!categories.length) dispatch(get_categories());
        dispatch(clearMessage());
        

        //posibilidad para eliminar la funcion de desmontaje y reemplazarla con el useEffect:
        return () => {
            dispatch(clearMessage());
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
            <section >
                <form >
                    <span >
                        <input
                            
                            onChange={hadleInputChange}
                            value={inputCategory.name}
                            name="name"
                            placeholder="Ingresa el nombre de la categoria"
                        />
                        <button
                          
                            onClick={handlePostCategories}
                        >
                            Postear categorias
                        </button>
                        {backmessage && <p>{backmessage}</p>}
                    </span>
                    <span>{error && <p>{error.category}</p>}</span>
                </form>
                <div className={styles.Tabla}>                 <Table className="table table-striped table-bordered table-hover">
      <thead>
          <tr>
            <th>#</th>
            <th >Nombre</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody >
        {categories.allCategories.map((category, index) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
              <button onClick={() => deleteCategory1(category.id)}className={styles.deleteButton}>
                       <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                     <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                   </svg>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
</div>
 </section>
        </div>
    );
};

export default Categories;
