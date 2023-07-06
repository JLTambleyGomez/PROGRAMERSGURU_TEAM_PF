import { useSelector, useDispatch } from "react-redux";
import { gET_CATEGORIES, pOST_CATEGORIES, dELETE_CATEGORIES } from "../../../Redux/actions";
import { useEffect, useState } from "react";
import validate from "./validate";
import styles from "./AdminPanel.module.css"

//_______________________.module___________________________
const AdminPanel = () => {

  //const
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const darkmode = useSelector((state)=> state.darkMode);
  //states
  const [inputCategory, setInput] = useState({ category: "" });
  const [changeDarkMode , setChangeDarkMode] = useState("");
  const [error, setError] = useState({});

  //functions
  const hadleInputChange = (event) => {
    const { value } = event.target;
    setInput({ category: value });
  };

  const deleteCategory = (id) => {
    dispatch(dELETE_CATEGORIES(id));
    Promise.resolve().then(() => {
    setInput({ category: '' }) 
     dispatch(gET_CATEGORIES());
    });
  }
  
  async function addCategory(event) {
    dispatch(pOST_CATEGORIES(inputCategory));
    Promise.resolve().then(() => {
      setInput({ category: '' });
      dispatch(gET_CATEGORIES());
    });
  }
  
  
  //useEffect
  useEffect(() => { 
    dispatch(gET_CATEGORIES());
  }, []);

  // useEffect(() => {
  //   setError(validate(inputCategory));
  //   console.log(error)
  // }, [inputCategory])

  useEffect (() => {
  if (darkmode === true){
    setChangeDarkMode("darkContainer");
  }else{
    setChangeDarkMode("lightContainer");
  }
  } , [darkmode])


  return (
    <div className={`${styles[changeDarkMode]}`}>
    <p>ADMINISTRAR CATEGORIAS</p>
      <div>
        <h1>Categories</h1>
        <ul>{categories?.map((cat, i) => <li key={i}><p>Id:{cat.id}=  {cat.name} <button onClick={() => { deleteCategory(cat.id) }}
        >Borrar</button></p></li>)}</ul>

        {/* <button onClick={buttonHandler}>Borrar categorias</button> */}

        <h1>Crear Categoría</h1>
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
