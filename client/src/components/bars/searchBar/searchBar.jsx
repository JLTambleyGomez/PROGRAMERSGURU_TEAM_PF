import { useDispatch } from "react-redux";
import { useState } from "react";

import styles from "./searchBar.module.css";

//_________________________module_________________________
function SearchBar() {
  //const:
  const dispatch = useDispatch();

  //states:
  const [input, setInput] = useState("");

  //functions:
  const handleSearchInput = (event) => {
    setInput(event.target.value);
  };

  const handlerButtonSearch = (event) => {
    const setDefault = (event) => {
      event.preventDefault();
      /*dispatch(getRecipes(found.info))*/
      setInput("");
    };
  };

  return (
    <div className={styles.Container}>
      <div className={styles.SearchBar}>
        <input type="search" onChange={handlerSearchTerm} value={input} />
        <button className={styles.button} onClick={handlerButtonSearch}>
          search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
