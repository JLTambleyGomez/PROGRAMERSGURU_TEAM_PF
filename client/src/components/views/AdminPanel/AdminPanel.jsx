import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gET_CATEGORIES, pOST_CATEGORIES, dELETE_CATEGORIES } from "../../../Redux/actions";
import validate from "./validate";
// import styles from "./AdminPanel.module.css"

import "./AdminPanel.css"
//_________________________module_________________________
function AdminPanel () {

    //global state:
    const categories = useSelector((state) => state.categories);
    const message = useSelector((state) => state.message);
    const darkmode = useSelector((state)=> state.darkMode);
    

    //const:
    const dispatch = useDispatch();

    //states:
    const [inputCategory, setInputCategory] = useState({ category: "" });
    const [error, setError] = useState({});
    const [changeDarkMode, setChangeDarkMode] = useState("");
    const [backmessage, setbackmessage]= useState("")

    //functions:
    const hadleInputChange = (event) => {
        setbackmessage("")
        const { value } = event.target;
        setInputCategory({ category: value });
    
    };

    const addCategory = async (event) => {
        try {
            event.preventDefault();
            await dispatch(pOST_CATEGORIES({ category: inputCategory.category}));
            setInputCategory({ category: "" })
            await dispatch(gET_CATEGORIES());  
           
        } catch (error) {
            console.log(error)
        } setbackmessage(message)
    }

    const deleteCategory = async (id) => {
        try {
            await dispatch(dELETE_CATEGORIES(id))
            await dispatch(gET_CATEGORIES())
        } catch (error) {
            console.log("error");
        }
    };

    //useEffect:
    useEffect(() => {
        dispatch(gET_CATEGORIES());
    }, []);

    // useEffect(() => {
    //     return () => {
    //         window.alert(message)
    //     }
    // }, [message])

    useEffect (() => {
        if (darkmode === true) {
            setChangeDarkMode("darkContainer");
        } else {
            setChangeDarkMode("lightContainer");
        }
    } , [darkmode])

    useEffect(() => {
        setError(validate(inputCategory));
    }, [inputCategory])

    //component:
    return (
        <div className={`${changeDarkMode}`}>
            <div className="adminPanelSection1">
                <h1>ADMINISTRAR CATEGORIAS</h1>
            </div>
            <div className="adminPanelSection2">
                <div className="adminPanelSection2-1">
                    <span className="adminPanelSection2-1-1">
                        <input
                            className="adminPanelSection2-1-1Input"
                            onChange={hadleInputChange}
                            value={inputCategory.category}
                            name="name"
                            placeholder="Ingresa el nombre de la categoria"
                        />
                        <button onClick={addCategory}>Postear categorias</button>
                        <p>{backmessage}</p>
                    </span>
                    <span className="adminPanelSection2-1-2">
                        {
                            error && (
                                <p>{error.category}</p>
                            )
                        }
                    </span>
                </div>
                <div className="adminPanelSection2-2">
                    <h2>Categories</h2>
                    <ul className="adminPanelSectionCategoryList">
                        {
                            categories?.map((category, index) => {
                                return (
                                    <span className="adminPanelSectionCategoryListItem">
                                        <p key={index}>{category.id} : {category.name}</p>
                                        <button onClick={() => deleteCategory(category.id)}>X</button>
                                    </span>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;