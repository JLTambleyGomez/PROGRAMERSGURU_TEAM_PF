import { 
//COURSES:
    GET_COURSES_ALL, 
    GET_COURSES_BY_NAME, 
    FILTER_COURSES_BY_LANGUAGE, 
    FILTER_COURSES_BY_PRICING, 
    ORDER_COURSES, 
//CATEGORIES:
    GET_CATEGORIES_ALL, 
    POST_CATEGORIES, 
    DELETE_CATEGORIES,
// ERRORS: 
    ERROR 
} from "./actions";
//__________________________________________________

//GLOBAL STORAGE:
const goblalStorage = {
    allCourses:[
        {
            title: "Introducción a la programación",
            description: "Aprende los conceptos básicos de la programación",
            rating: 4.5,
            free: true,
            language: "Español"
        },
        {
            title: "Web Development 101",
            description: "Learn the fundamentals of web development",
            rating: 4.2,
            free: false,
            language: "English"
        },
        {
            title: "Data Science for Beginners",
            description: "Get started with data science and analytics",
            rating: 4.7,
            free: true,
            language: "English"
        },
        {
            title: "Aprende Photoshop desde cero",
            description: "Descubre cómo utilizar Photoshop para editar imágenes",
            rating: 4.1,
            free: true,
            language: "Español"
        },
        {
            title: "Machine Learning Fundamentals",
            description: "Learn the basics of machine learning algorithms",
            rating: 4.3,
            free: false,
            language: "English"
        },
    ],
    courses:[
        {
            title: "Introducción a la programación",
            description: "Aprende los conceptos básicos de la programación",
            rating: 4.5,
            free: true,
            language: "Español"
        },
        {
            title: "Web Development 101",
            description: "Learn the fundamentals of web development",
            rating: 4.2,
            free: false,
            language: "English"
        },
        {
            title: "Data Science for Beginners",
            description: "Get started with data science and analytics",
            rating: 4.7,
            free: true,
            language: "English"
        },
        {
            title: "Aprende Photoshop desde cero",
            description: "Descubre cómo utilizar Photoshop para editar imágenes",
            rating: 4.1,
            free: true,
            language: "Español"
        },
        {
            title: "Machine Learning Fundamentals",
            description: "Learn the basics of machine learning algorithms",
            rating: 4.3,
            free: false,
            language: "English"
        },
    ],
    categories:[],
    message:[],
}

//REDUCER:
export default function rootReducer ( state = goblalStorage, { type, payload } ) {

    switch (type) {
        // case 'GET_COURSES':
        //     return { ...state, allCourses: payload, courses: payload };

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

        default: return {...state}; 
    }
}