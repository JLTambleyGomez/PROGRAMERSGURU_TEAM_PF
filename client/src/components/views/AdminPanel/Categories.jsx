import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_categories, post_categories, delete_categories, clearMessage } from "../../../Redux/actions";
import validate from "./validate";
import styles from "./AdminPanel.module.css";

const Categories = () => {
  // global state:
  const categories = useSelector((state) => state.categories);
  const dark = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  // states:
  const [inputCategory, setInputCategory] = useState({ category: "" });
  const [error, setError] = useState({});
  const [backmessage, setbackmessage] = useState("");

  const theme = (base) => {
    const suffix = dark ? "dark" : "light";
    return `${base}-${suffix}`;
  };

  const hadleInputChange = (event) => {
    setbackmessage("");
    const { value } = event.target;
    setInputCategory({ category: value });
  };

  const handlePostCategories = async (event) => {
    event.preventDefault();

    try {
      await dispatch(post_categories({ technology: inputCategory.category }));
      setInputCategory({ category: "" });
      await dispatch(get_categories());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await dispatch(delete_categories(id));
      await dispatch(get_categories());
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    setError(validate(inputCategory));
  }, [inputCategory]);

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(get_categories());

    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className={styles.contain}>
      <div>
      </div>
      <section className={`${styles.Panel}`}>
        <form className={`${styles.categoriesForm}`}>
          <span className={`${styles.categoriesPostBar}`}>
            <input
              className={`${styles.categoriesInput}`}
              onChange={hadleInputChange}
              value={inputCategory.category}
              name="name"
              placeholder="Ingresa el nombre de la categoria"
            />
            <button className={`${styles.categoriesPostButton}`} onClick={handlePostCategories}>
              Postear categorias
            </button>
            {backmessage && <p>{backmessage}</p>}
          </span>
          <span>{error && <p>{error.category}</p>}</span>
        </form>

        <div className={`${styles.categoriesContainer}`}>
          <h2>Categories</h2>
          <div className={`${styles.categoriesBox}`}>
            {categories &&
              categories?.map((category, index) => (
                <span className={`${styles.category}`} key={index}>
                  <label>
                    {category.id} : {category.name}
                  </label>
                  <button className={`${styles.deleteCategoryButton}`} onClick={() => deleteCategory(category.id)}>
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
