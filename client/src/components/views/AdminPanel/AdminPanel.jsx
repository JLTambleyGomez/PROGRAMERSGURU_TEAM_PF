import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gET_CATEGORIES, pOST_CATEGORIES, dELETE_CATEGORIES } from "../../../Redux/actions";
import validate from "./validate";

import "./AdminPanel.css"
//_________________________module_________________________
function AdminPanel () {

    //global state:
    const categories = useSelector((state) => state.categories);
    const message = useSelector((state) => state.message)

    //const:
    const dispatch = useDispatch();

    //states:
    const [inputCategory, setInputCategory] = useState({ category: "" });
    const [error, setError] = useState({});

    //functions:
    const hadleInputChange = (event) => {
        const { value } = event.target;
        setInputCategory({ category: value });
    };

    function addCategory (event) {
        event.preventDefault();
        dispatch(pOST_CATEGORIES({ category: inputCategory.category}));
        setInputCategory({ category: "" })
    }

    const deleteCategory = (event) => {
        event.preventDefault()
        const { category } = inputCategory;
        dispatch(dELETE_CATEGORIES(inputCategory));
        dispatch(gET_CATEGORIES());
        setInputCategory({ category: "" })
    };

    //useEffect:
    useEffect(() => { 
        dispatch(gET_CATEGORIES());
    }, [categories]);

    useEffect(() => {
        window.alert(message)
    }, [message])

    useEffect(() => {
        setError(validate(inputCategory));
    }, [inputCategory])

    //component:
    return (
        <div className="adminPanelContainer">
            <div className="adminPanelSection1">
                <h1>ADMINISTRAR CATEGORIAS</h1>
            </div>
            <div className="adminPanelSection2">
                <div className="adminPanelSection2-1">
                    <input
                        onChange={hadleInputChange}
                        value={inputCategory.category}
                        name="name"
                        placeholder="Ingresa el nombre de la categoria"
                    />
                    <button onClick={addCategory}>Postear categorias</button>
                </div>
                <div className="adminPanelSection2-2">
                    <h1>Categories</h1>
                    <ul className="adminPanelSectionCategoryList">
                        {
                            categories?.map((category, index) => {
                                return (
                                    <div className="adminPanelSectionCategoryListItem">
                                        <li key={index}>{category}</li>
                                        <button onClick={() => deleteCategory(category)}>X</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    {/* boton debe recibir un id al que debe acceder a traves de category. Category debe ser un array de objetos (name, id)*/}

                    {/* <button onClick={buttonHandler}>Borrar categorias</button> */}

                    {/* <h1>Borrar Categoría</h1> */}
                    {/* {
                        error && (
                            <p>{error.category}</p>
                        )
                    } */}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;