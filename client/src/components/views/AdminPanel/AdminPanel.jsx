import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all, post_Products, delete_Products,get_categories, post_categories, clearCourses, clearMessage, delete_categories, get_courses_all, post_course, delete_course } from "../../../Redux/actions";
import validate from "./validate";

import styles from "./AdminPanel.module.css";

//_________________________module_________________________
function AdminPanel () {

    //global state: 
    const categories = useSelector((state) => state.categories);
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    const courses = useSelector((state) => state.allCourses);
    const products = useSelector((state) => state.products);
    
    //const:
    const dispatch = useDispatch();

    //states:
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        rating: 0,
        released: "",
        isFree: false,
        language: "",
        categories: [],
    });
    const [inputCategory, setInputCategory] = useState({ category: "" });
    const [error, setError] = useState({});

    const [backmessage, setbackmessage]= useState("")
    const [showcategories,setshowcategories]= useState(false)
    const [showcursos,setshowcursos]= useState(false)
    const [showproducts, setshowproducts]=useState(false)


    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleCategorySelection = (event) => {
        const selectedCategories = Array.from(event.target.selectedOptions, (option) => ({
            id: option.value,
        }));
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            categories: selectedCategories,
        }));
    };

    const handleShowCategories = (event) =>{
        event.preventDefault();
        if (showcategories === false) setshowcategories(true);
        else setshowcategories(false);
    }

    const handleShowCursos = (event) =>{
        if (showcursos === false) setshowcursos(true);
        else setshowcursos(false);
    }

    const handleShowProducts = (event) =>{
      if (showproducts === false) setshowproducts(true);
      else setshowproducts(false);
    }

    const hadleInputChange = (event) => {

        setbackmessage("")
        const { value } = event.target;
        setInputCategory({ category: value });
    
    };

    const handlePostCategories = async (event) => {
        event.preventDefault();

        try {
            await dispatch(post_categories({ technology: inputCategory.category }));
            setInputCategory({ category: "" });
            await dispatch(get_categories());
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await dispatch(delete_categories(id))
            await dispatch(get_categories())
        } catch (error) {
            console.log("error");
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await dispatch(delete_course(id));
            await dispatch(get_courses_all());
        } catch (error) {
            console.log("error");
        }
    };

    const handleCoursePost = (event) => {
        event.preventDefault();
        dispatch(post_course(newCourse))
        .then(() => {
            setNewCourse({
                title: "",
                description: "",
                imageURL: "",
                courseUrl: "",
                rating: 0,
                released: "",
                isFree: false,
                language: "",
                categories: [],
            });
            dispatch(get_courses_all());
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleProductDelete =(id)=>{
        try {
            dispatch (delete_Products(id))
            dispatch(get_products_all());
        } catch (error) {
            console.log("error");
        }
    }

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_categories());
        dispatch(get_courses_all());
        dispatch(get_products_all());

        

        return () => {                // return ocupar para hacer algo en el desmontaje          
            dispatch(clearMessage()); // limpiar 
            dispatch(clearCourses()); 
        }
    }, [dispatch]);

    useEffect(() => {
        setError(validate(inputCategory));
    }, [inputCategory])


      

    //component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`} >

            <div className={styles.message}>Respuesta desde Servidor: {message}</div>

            <div className={styles.contain} >
            <div>
                <button className={`${styles.mainButton}`} onClick={handleShowCategories} >
                    <h1 className={`${styles.h1}`}>ADMINISTRAR CATEGORIAS</h1>
                </button>
            </div>
            {showcategories&& ( 
                <section className={`${styles.Panel}`}>
                    <form className={`${styles.categoriesForm}`}>
                        <span className={`${styles.categoriesPostBar}`}>
                            <input
                                className={`${styles.categoriesInput}`}
                                onChange={hadleInputChange}
                                value={inputCategory.category}
                                name="name"
                                placeholder="Ingresa el nombre de la categoria"
                            />
                            <button className={`${styles.categoriesPostButton}`} onClick={handlePostCategories}>Postear categorias</button>
                            {backmessage && <p>{backmessage}</p>}
                        </span>
                        <span>
                            {
                                error && <p>{error.category}</p>
                            }
                        </span>
                    </form>

                    <div className={`${styles.categoriesContainer}`}>
                        <h2>Categories</h2>
                        <div className={`${styles.categoriesBox}`}>
                            {
                                categories?.map((category, index) => {
                                    return (
                                        <span className={`${styles.category}`}>
                                            <label key={index}>{category.id} : {category.name}</label>
                                            <button className={`${styles.deleteCategoryButton}`} onClick={() => deleteCategory(category.id)}>X</button>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            )}

            <div>
                <button className={`${styles.mainButton}`} onClick={handleShowCursos}>
                    <h1 className={styles.h1}>ADMINISTRAR CURSOS</h1>
                </button>
            </div>
            {showcursos && (
                <section className={`${styles.Panel}`}>
                    <form className={`${styles.coursesForm}`}>
                        <h2>Nuevo Curso</h2>
                        <div className={`${styles.h1}`}>
                            <label>Título:</label>
                            <input
                                type="text"
                                name="title"
                                value={newCourse.title}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label >Descripción:</label>
                            <textarea
                                name="description"
                                value={newCourse.description}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>URL de la imagen:</label>
                            <input
                                type="text"
                                name="imageURL"
                                value={newCourse.imageURL}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>URL del curso:</label>
                            <input
                                type="text"
                                name="courseUrl"
                                value={newCourse.courseUrl}
                                onChange={handleCourseChange}
                        />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>Rating:</label>
                            <input
                                type="number"
                                name="rating"
                                value={newCourse.rating}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>Fecha de lanzamiento:</label>
                            <input
                                type="date"
                                name="released"
                                value={newCourse.released}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>Es gratuito:</label>
                            <input
                                type="checkbox"
                                name="isFree"
                                checked={newCourse.isFree}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>Idioma:</label>
                            <input
                                type="text"
                                name="language"
                                value={newCourse.language}
                                onChange={handleCourseChange}
                            />
                        </div>

                        <div className={`${styles.h1}`}>
                            <label>Categorías:</label>
                            <select multiple name="categories" onChange={handleCategorySelection}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={handleCoursePost}>Postear curso</button>
                    </form>

                    <div className={`${styles.coursesContainer}`}>
                        <h1>Courses</h1>
                        <div className={`${styles.coursesBox}`}>
                            {courses.map((course) => (
                                <div>
                                    <div className={`${styles.course}`} key={course.id}>
                                        <p>ID: {course.id}</p> {course.title} 
                                        <p>Fecha De Lanzamiento {course.released} </p>                               
                                        <button onClick={() =>handleDeleteCourse(course.id)}>X</button>    
                                    </div>
                                </div> 
                            ))}
                        </div>
                    </div>
                </section>
            )}

              <div>
                <button className={`${styles.mainButton}`} onClick={handleShowProducts}>
                    <h1 className={styles.h1}>ADMINISTRAR PRODUCTOS</h1>
                </button>
                 </div>
                 {showproducts&& ( 
                <section className={`${styles.Panel}`}>
                  

                    <div className={`${styles.categoriesContainer}`}>
                        <h2>Productos</h2>
                        <div className={`${styles.categoriesBox}`}>
                            {
                                products?.map((product, index) => {
                                    return (
                                        <span className={`${styles.category}`}>
                                            <label key={index}>
                                              <p>{product.name}</p>
                                               <p>{product.id}</p> 
                                               <p>{product.price}</p> 
                                               <p>{product.category}</p> 
                                               
                                               </label>
                                            <button className={`${styles.deleteCategoryButton}`} onClick={() => handleProductDelete(product.id)}>X</button>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
            )}
              

              </div>
        </div>
    );
};

export default AdminPanel;
