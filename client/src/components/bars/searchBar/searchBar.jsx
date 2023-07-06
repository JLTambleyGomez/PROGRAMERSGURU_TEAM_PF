import { useDispatch } from "react-redux";
import { useState } from "react";

import styles from "./searchBar.module.css"

//_________________________module_________________________
function SearchBar () {

    //const:
    const dispatch = useDispatch()

    //states:
    const [input, setInput] = useState("");

    //functions:
    const handleSearchInput = (event) => {
        setInput(event.target.value)
    }

    const handleSearchButton = (event) => {
        event.preventDefault();
        setInput("")
    }

    //component:
    return (
        <div className={styles.Container}>
        <div className={styles.SearchBar}>
            <input  type = 'search' onChange = {handleSearchInput} value = {input}/>
            <button className={styles.button} onClick = {handleSearchButton}>search</button>    
        </div>
        </div>
    )
}


export default SearchBar;