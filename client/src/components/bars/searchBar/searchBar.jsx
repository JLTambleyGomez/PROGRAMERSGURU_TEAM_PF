import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { get_courses_by_name } from "../../../Redux/actions";
import styles from "./searchBar.module.css"

//_________________________module_________________________
function SearchBar () {

    //const:
    const dispatch = useDispatch()

    //states:
    const [input, setInput] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(true)


    const darkmode = useSelector((state)=> state.darkMode);
    const [elementClasses, setElementClasses] = useState({
        h1: "h1light",
        input: "inputlight",
        button: "buttonlight",
        buttoncontainer:"buttoncontainerlight",
        container: "containerslight",
        label: "labellight",
        p:"plight",
        div:"divlight",
        span:"spanlight",
        form: "formlight",
        hr: "hrlight",
        error:"errorlight",
        success:"successlight",
        link:"linklight",
        ul:"ullight",
        h2:"h2light",
    });


    //functions:
    useEffect(() => {
        const updatedElementClasses = {};
    
        Object.keys(elementClasses).forEach((key) => {
          updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });
    
        setElementClasses(updatedElementClasses);
    }, [darkmode]);

    const handleSearchInput = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    const handleSearchButton = (event) => {
        event.preventDefault();
        dispatch(get_courses_by_name(input))
        setInput("")
        setToggleVisibility(true);
    };

    const setDefault = (event) => {
        event.preventDefault();
        setToggleVisibility(true);
        setInput('');
      };

    //component:
    return (
        <div  className={`${styles.container} ${styles[elementClasses.container]}`}>
            <div >
            {
                toggleVisibility
                ? (
                    <div>
                        <h1  className={`${styles.h1} ${styles[elementClasses.h1]}`} onClick = {() => setToggleVisibility(false)}>S E A R C H</h1>
                    </div>
                ) : (
                    <div className={`${styles.container} ${styles[elementClasses.container]}`} onBlur = {setDefault}>
                        <input className={`${styles.input} ${styles[elementClasses.input]}`} type = "search" onChange = {handleSearchInput} value = {input} autoFocus placeholder = 'try "beef"'/>
                        <p className={`${styles.p} ${styles[elementClasses.p]}`} onClick = {handleSearchButton}>
                        🔎
                        </p>
                    </div>
                )
            }

            </div>
        </div>
        
      
    )
}


export default SearchBar;