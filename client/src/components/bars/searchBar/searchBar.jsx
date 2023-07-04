import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./searchBar.module.css"


const SearchBar = () => {


    const dispatch = useDispatch()


    const [input, setInput] = useState("");
    //valor de la findCourse "name"


    const handlerSearchTerm = (event) => {
        setInput(event.target.value)
        
    }

    const handlerButtonSearch = (event) => {
        event.preventDefault();
        /*dispatch(getRecipes(found.info))*/
        setInput("")
    }

    return (
        <div className={styles.Container}>
        <div className={styles.SearchBar}>
            <input  type = 'search' onChange = {handlerSearchTerm} value = {input} />
            <button className={styles.button} onClick = {handlerButtonSearch}>search</button>    
        </div>
        </div>
    )
}


export default SearchBar;
