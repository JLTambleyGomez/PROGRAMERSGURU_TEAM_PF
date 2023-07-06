import { 
//COURSES:
    GET_COURSES_ALL, 
    GET_COURSES_BY_NAME, 
    DELETE_COURSE,
    FILTER_COURSES_BY_LANGUAGE, 
    FILTER_COURSES_BY_PRICING, 
    ORDER_COURSES, 
//CATEGORIES:
    GET_CATEGORIES_ALL, 
    POST_CATEGORIES, 
    DELETE_CATEGORIES,
// ERRORS: 
    ERROR,
// DARK MODE:
    DARK_MODE
} from "./actions";
//__________________________________________________

//GLOBAL STORAGE:
const goblalStorage = {
    allCourses:[],
    courses:[],
    categories:[],
    message:[],
    darkMode:false,
}

//REDUCER:
export default function rootReducer ( state = goblalStorage, { type, payload } ) {

    switch (type) {
        case GET_COURSES_ALL:
            return { ...state, allCourses: payload, courses: payload };

        case FILTER_COURSES_BY_LANGUAGE:
            return { ...state, courses:state.allCourses.filter(course => course.language === payload)};

        case FILTER_COURSES_BY_PRICING:
            return { ...state, courses:state.allCourses.filter(course => course.free === payload)}

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
                message: payload
            }
        case DARK_MODE:
            return {
                ...state,
                darkMode: payload
            }; 
        default: return {...state}; 
    }
}