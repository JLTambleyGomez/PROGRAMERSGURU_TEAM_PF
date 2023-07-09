import { 
//COURSES:
    GET_COURSES_ALL, 
    GET_COURSES_BY_NAME, 
    DELETE_COURSE,
    POST_COURSE, 
    FILTER_COURSES_BY_LANGUAGE, 
    FILTER_COURSES_BY_PRICING, 
    ORDER_COURSES, 
    GET_COURSES_BY_ID,
//CATEGORIES:
    GET_CATEGORIES_ALL, 
    POST_CATEGORIES, 
    DELETE_CATEGORIES,
// ERRORS: 
    ERROR,
    CLEAR_COURSES,
    CLEAN_MESSAGE,
// DARK MODE:
    DARK_MODE,
    //FAVORITES:
GET_FAVORITES

} from "./actions";

// PRUEBA CURSOS
import jsonData from './cursos.json';

//___________________________________________________

//GLOBAL STORAGE:
const goblalStorage = {
    allCourses: [],
    courses:[],
    categories:[],
    error:"",
    message:"",
    darkMode:false,
    courseActual:{},
    favorites:[]
}

//REDUCER:
export default function rootReducer ( state = goblalStorage, { type, payload } ) {

    switch (type) {
        case GET_COURSES_ALL:
            return { ...state, allCourses: payload, courses: payload };

        case GET_COURSES_BY_NAME:
            return { ...state, allCourses: payload, courses: payload };

        case GET_COURSES_BY_ID:
            return { ...state, courseActual: payload};

        case FILTER_COURSES_BY_LANGUAGE:
            return { ...state, courses:state.allCourses.filter(course => course.language === payload)};

        case FILTER_COURSES_BY_PRICING:
            return { ...state, courses:state.allCourses.filter(course => course.isFree === payload)}

        case ORDER_COURSES:
            const todos_cursosOrdenados = [...state.allCourses];
            const cursosOrdenados = [...state.courses]

            if (payload === "ABC+") {
                todos_cursosOrdenados.sort((a, b) =>  a.title.toLowerCase().charCodeAt(0)- b.title.toLowerCase().charCodeAt(0));
                cursosOrdenados.sort((a, b) =>  a.title.toLowerCase().charCodeAt(0)- b.title.toLowerCase().charCodeAt(0));
            } else if (payload === "ABC-") {
                todos_cursosOrdenados.sort((a, b) =>  b.title.toLowerCase().charCodeAt(0)- a.title.toLowerCase().charCodeAt(0));
                cursosOrdenados.sort((a, b) =>  b.title.toLowerCase().charCodeAt(0)- a.title.toLowerCase().charCodeAt(0));
            }
            return { 
                ...state, 
                allCourses: todos_cursosOrdenados, 
                courses: cursosOrdenados
            }

        case GET_CATEGORIES_ALL:
            return {
                ...state,
                categories: payload,
            };

        case POST_CATEGORIES:
            return {
                ...state,
                message: payload.message,
            };
            case ERROR:
                return {
                  ...state,
                  error: action.payload,
                };
              case CLEAN_MESSAGE:
                return {
                  ...state,
                  error: "",
                  message:"",
                };
              case CLEAR_COURSES:
                return {
                  ...state,
                  allCourses: [],
                  courseActual:{}
                };
        case DARK_MODE:
            return {
                ...state,
                darkMode: payload
            }; 
        case GET_FAVORITES:
            return { ...state, favorites: payload};

        default: return {...state}; 
    }
}