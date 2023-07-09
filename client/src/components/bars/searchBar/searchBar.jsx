import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { get_courses_by_name } from "../../../Redux/actions";
import styles from "./searchBar.module.css"

//_________________________module_________________________
function SearchBar () {

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
        setInput(event.target.value);
      };
    
      const handleSearchButton = async (event) => {
        event.preventDefault();
        try {
          
          dispatch(get_courses_by_name(input));
          setInput("");
          setToggleVisibility(true);
          navigate("/CoursePage");
        } catch (error) {
          console.log(error);
        }

      };
    
      const setDefault = (event) => {
        event.preventDefault();
        setToggleVisibility(true);
        setInput("");
      };
    
      return (
        <div className={`${styles.container} ${styles[elementClasses.container]}`}>
          {toggleVisibility ? (
            <div>
              <h1
                className={`${styles.h1} ${styles[elementClasses.h1]}`}
                onClick={() => setToggleVisibility(false)}
              >
                S E A R C H
              </h1>
            </div>
          ) : (
            <div className={`${styles.container} ${styles[elementClasses.container]}`}>
              <input
                className={`${styles.input} ${styles[elementClasses.input]}`}
                type="search"
                onChange={handleSearchInput}
                value={input}
                autoFocus
                placeholder='try "Java"'
              />
              <p
                className={`${styles.p} ${styles[elementClasses.p]}`}
                onClick={handleSearchButton}
              >
                🔎
              </p>
            </div>
          )}
        </div>
      );
    }

export default SearchBar;