import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_courses_by_name } from "../../../Redux/actions";
import styles from "./searchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Global states:
  const darkmode = useSelector((state) => state.darkMode);

  // States:
  const [input, setInput] = useState("");

  const [toggleVisibility, setToggleVisibility] = useState(true);
  const [elementClasses, setElementClasses] = useState({
    h1: "h1light",
    input: "inputlight",
    button: "buttonlight",
    buttoncontainer: "buttoncontainerlight",
    container: "containerslight",
    label: "labellight",
    p: "plight",
    div: "divlight",
    span: "spanlight",
    form: "formlight",
    hr: "hrlight",
    error: "errorlight",
    success: "successlight",
    link: "linklight",
    ul: "ullight",
    h2: "h2light",
  });

  // Functions:
  const handleSearchInput = (event) => {
    setInput(event.target.value);
  };

  const handleSearchButton = async () => {

   dispatch(get_courses_by_name(input));
    setInput("");
    setToggleVisibility(true);
    navigate("/CoursePage");
  };

    const setDefault = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setInput("");
          setToggleVisibility(true);
        }, 300);
      };
      

  // Life-cycles:
  useEffect(() => {
    const updatedElementClasses = {};

    Object.keys(elementClasses).forEach((key) => {
      updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
    });

    setElementClasses(updatedElementClasses);
  }, [darkmode]);

  // Component:
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
        <div
          className={`${styles.container} ${styles[elementClasses.container]}`}
          onBlur={setDefault}
        >
          <input
            className={`${styles.input} ${styles[elementClasses.input]}`}
            type="search"
            onChange={handleSearchInput}
            value={input}
            placeholder='try "Java"'
            autoFocus
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
