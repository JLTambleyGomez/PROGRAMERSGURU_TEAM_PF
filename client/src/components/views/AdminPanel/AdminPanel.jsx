import { useSelector, useDispatch } from "react-redux";
import { gET_CATEGORIES, pOST_CATEGORIES, dELETE_CATEGORIES } from "../../../Redux/actions";
import { useEffect, useState } from "react";
import validate from "./validate";

//_______________________.module___________________________
const AdminPanel = () => {

  //const
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  //states
  const [inputCategory, setInput] = useState({ category: "" });

  const [error, setError] = useState({});

  //functions
  const hadleInputChange = (event) => {
    const { value } = event.target;
    setInput({ category: value });
  };

  const deleteCategory = () => {
    const { category } = inputCategory;
    dispatch(dELETE_CATEGORIES(inputCategory));
    dispatch(gET_CATEGORIES());
    setInput({ category: '' })
  };

  function addCategory (event) {
    const { category } = inputCategory;
    dispatch(pOST_CATEGORIES(inputCategory));
    dispatch(gET_CATEGORIES());
    setInput({category:''})
  }

  //useEffect
  useEffect(() => { 
    dispatch(gET_CATEGORIES());
  }, []);

  // useEffect(() => {
  //   setError(validate(inputCategory));
  //   console.log(error)
  // }, [inputCategory])


  return (
    <div>
      <p>ADMINISTRAR CATEGORIAS</p>
      <div>
        <h1>Categories</h1>
        <ul>{categories?.map((cat, i) => <li key={i}>{cat}</li>)}</ul>

        {/* <button onClick={buttonHandler}>Borrar categorias</button> */}

        <h1>Borrar Categoría</h1>
        <input
          onChange={hadleInputChange}
          value={inputCategory.category}
          name="name"
          placeholder="Ingresa el nombre de la categoria"
        />
        <button onClick={addCategory}>Postear categorias</button>
      </div>
    </div>
  );
};

export default AdminPanel;
