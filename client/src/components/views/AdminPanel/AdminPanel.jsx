import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gET_CATEGORIES, pOST_CATEGORIES, dELETE_CATEGORIES, get_courses_all, post_cuorse,delete_Course_Request } from "../../../Redux/actions";
import validate from "./validate";
import styles from "./AdminPanel.module.css"

//_________________________module_________________________
function AdminPanel () {

    //global state:
    const categories = useSelector((state) => state.categories);
    const message = useSelector((state) => state.message);
    const darkmode = useSelector((state)=> state.darkMode);
    const courses = useSelector((state)=> state.allCourses);
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
      

    //const:
    const dispatch = useDispatch();

    //states:
    const [inputCategory, setInputCategory] = useState({ category: "" });
    const [error, setError] = useState({});
    const [changeDarkMode, setChangeDarkMode] = useState("");
    const [backmessage, setbackmessage]= useState("")
    const [showcategories,setshowcategories]= useState(false)
    const [showcursos,setshowcursos]= useState(false)


    //functions:
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
      
    const handleshowcategories =() =>{
        if (showcategories===false)
        setshowcategories(true);
        else setshowcategories(false)
    }
    const handleshowcursos =() =>{
        if (showcursos===false)
        setshowcursos(true);
        else setshowcursos(false)
    }

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
 

    const handledeleteCourse = async (id) => {
        try {
          await dispatch(delete_Course_Request(id));
          await dispatch(get_courses_all());
        } catch (error) {
          console.log("error");
        }
      };
      



    const handleCoursePost = () => {
        dispatch(post_cuorse(newCourse))
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
      

    //useEffect:
    useEffect(() => {
        dispatch(gET_CATEGORIES());
        dispatch(get_courses_all())
    }, []);


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
        <div className={`${styles}${changeDarkMode}`}>
            <div >
               <button className={styles.button} onClick={handleshowcategories} ><h1 className={styles.h1}>ADMINISTRAR CATEGORIAS</h1></button>
            </div>
            {showcategories&& ( <div >
                <div >
                    <span >
                        <input
                            onChange={hadleInputChange}
                            value={inputCategory.category}
                            name="name"
                            placeholder="Ingresa el nombre de la categoria"
                        />
                        <button onClick={addCategory}>Postear categorias</button>
                        <p>{backmessage}</p>
                    </span>
                    <span >
                        {
                            error && (
                                <p>{error.category}</p>
                            )
                        }
                    </span>
                </div>
                <div >
                    <h2>Categories</h2>
                    <ul >
                        {
                            categories?.map((category, index) => {
                                return (
                                    <span>
                                        <p key={index}>{category.id} : {category.name}</p>
                                        <button onClick={() => deleteCategory(category.id)}>X</button>
                                    </span>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>)  }

            <div >
               <button className={styles.button} onClick={handleshowcursos} ><h1 className={styles.h1}>ADMINISTRAR CURSOS</h1></button>
            </div>
        
            {showcursos && (
  <div>
    <h2>Cursos</h2>
    <div>
      <label>Título:</label>
      <input
        type="text"
        name="title"
        value={newCourse.title}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>Descripción:</label>
      <textarea
        name="description"
        value={newCourse.description}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>URL de la imagen:</label>
      <input
        type="text"
        name="imageURL"
        value={newCourse.imageURL}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>URL del curso:</label>
      <input
        type="text"
        name="courseUrl"
        value={newCourse.courseUrl}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>Rating:</label>
      <input
        type="number"
        name="rating"
        value={newCourse.rating}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>Fecha de lanzamiento:</label>
      <input
        type="date"
        name="released"
        value={newCourse.released}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>Es gratuito:</label>
      <input
        type="checkbox"
        name="isFree"
        checked={newCourse.isFree}
        onChange={handleCourseChange}
      />
    </div>
    <div>
      <label>Idioma:</label>
      <input
        type="text"
        name="language"
        value={newCourse.language}
        onChange={handleCourseChange}
      />
    </div>
    <div>
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
    {courses.map((course) => (
      <div key={course.id}>
        <h3>
          <p>ID: {course.id}</p> {course.title}                                
        <button onClick={() =>handledeleteCourse(course.id)}>X</button>


        </h3>
        <p>{course.description}</p>
      </div>
    ))}
  </div>
)}


        </div>
    );
};

export default AdminPanel;