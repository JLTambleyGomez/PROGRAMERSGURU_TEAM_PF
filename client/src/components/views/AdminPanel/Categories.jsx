import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    get_categories, postCategory, deleteCategory, clearMessage
} from "../../../Redux/actions";
import { validate } from "./validate";


import styles from "./AdminPanel.module.css";


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
            <div></div>
            <section className={`${styles.Panel}`}>
                <form className={`${styles.categoriesForm}`}>
                    <span className={`${styles.categoriesPostBar}`}>
                        <input
                            className={`${styles.categoriesInput}`}
                            onChange={hadleInputChange}
                            value={inputCategory.name}
                            name="name"
                            placeholder="Ingresa el nombre de la categoria"
                        />
                        <button
                            className={`${styles.categoriesPostButton}`}
                            onClick={handlePostCategories}
                        >
                            Postear categorias
                        </button>
                        {backmessage && <p>{backmessage}</p>}
                    </span>
                    <span>{error && <p>{error.category}</p>}</span>
                </form>

                <div className={`${styles.categoriesContainer}`}>
                    <h2>Categories</h2>
                    <div className={`${styles.categoriesBox}`}>
                        {categories.allCategories.map((category, index) => (
                                <span
                                    className={`${styles.category}`}
                                    key={index}
                                >
                                    <label>
                                        {category.id} : {category.name}
                                    </label>
                                    <button
                                        className={`${styles.deleteCategoryButton}`}
                                        onClick={() =>
                                            deleteCategory1(category.id)
                                        }
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Categories;
