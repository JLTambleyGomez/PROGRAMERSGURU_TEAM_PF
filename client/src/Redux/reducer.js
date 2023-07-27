import {
    //COURSES:
    GET_COURSES_ALL,
    GET_COURSES_BY_NAME,
    DELETE_COURSE,
    POST_COURSE, 
    FILTER_COURSES_BY_LANGUAGE, 
    FILTER_COURSES_BY_PRICING, 
    ORDER_COURSES, 
    GET_COURSE_BY_ID,
    PUT_COURSE,
    //CATEGORIES:
    GET_CATEGORY_ALL,
    POST_CATEGORY,
    DELETE_CATEGORY,
    //TECHNOLOGIES
    DELETE_TECNOLOGY,
    POST_TECNOLOGY,
    GET_TECNOLOGY_ALL,
    // ERRORS:
    ERROR,
    CLEAR_COURSES,
    CLEAN_MESSAGE,
    CLEAR_USER,
    // DARK MODE:
    DARK_MODE,
    //FAVORITES:
    GET_FAVORITES,
    //USERS:
    GET_USER_BY_EMAIL,
    POST_USER,
    PUT_USER,
    DELETE_USER,
    //PRODUCTS
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    DELETE_PRODUCT,
    FILTER_PRODUCTS_BY_PRICING,
    FILTER_PRODUCTS_BY_CATEGORY,
    SORT_PRODUCTS,
    PUT_PRODUCTS,
    POST_PRODUCT,
    CLEAR_PRODUCTS,
    //CART,
    SET_CART,
    CLEAR_CART,
    //SHOPBAG
    TOGGLE_SHOPBAG,
    //HIGHLIGHT
    SET_HIGHLIGHT,
    CLEAR_HIGHLIGHT,
    //METAMASK
    METAMASK_ADDRESS,
    //SUBSCRIPTIONS
    GET_SUSCRIPTIONS,
    DELETE_SUSCRIPTION,
    PUT_SUSCRIPTION,
    POST_SUSCRIPTION,
  //ADMIN PANEL
   ADMIN_MESSAGE
} from "./actions";

// PRUEBA CURSOS
//import jsonData from './cursos.json';

//___________________________________________________

//GLOBAL STORAGE:
const globalStorage = {
    allCourses: [], //NO TOCAR SIN AVISAR ANTES
    courses: [],
    categories: [],
    error: "",
    message: "",
    darkMode: false,
    access: false,
    products: [],
    product: {},//
    user: {},
    cart: [],
    shopbag: false,
    highlightedItem: null,
    metamask: false,
    metamaskaddress: null,
    productsCopy: [],
    subscriptions: [], 
    allUsers: [],
    tecnology: []
};

//REDUCER:
export default function rootReducer(state = globalStorage, { type, payload }) {
    switch (type) {

        case GET_COURSES_ALL:
            return { ...state, allCourses: payload, courses: payload };

        case GET_COURSES_BY_NAME:
            return { ...state, allCourses: payload, courses: payload };

        case GET_COURSE_BY_ID:
            return { ...state, course: payload};

        case FILTER_COURSES_BY_LANGUAGE:
            return {
                ...state,
                courses: state.courses.filter(
                    (course) => course.language == payload
                ),
            };

        case FILTER_COURSES_BY_PRICING:
            return {
                ...state,
                courses: state.courses.filter(
                    (course) => course.isFree === payload
                ),
            };

        case ORDER_COURSES:
            const todos_cursosOrdenados = [...state.allCourses];
            const cursosOrdenados = [...state.courses];

            if (payload === "Ascendente") {
                todos_cursosOrdenados.sort(
                    (a, b) =>
                        a.title.toLowerCase().charCodeAt(0) -
                        b.title.toLowerCase().charCodeAt(0)
                );
                cursosOrdenados.sort(
                    (a, b) =>
                        a.title.toLowerCase().charCodeAt(0) -
                        b.title.toLowerCase().charCodeAt(0)
                );
            } else if (payload === "Desendente") {
                todos_cursosOrdenados.sort(
                    (a, b) =>
                        b.title.toLowerCase().charCodeAt(0) -
                        a.title.toLowerCase().charCodeAt(0)
                );
                cursosOrdenados.sort(
                    (a, b) =>
                        b.title.toLowerCase().charCodeAt(0) -
                        a.title.toLowerCase().charCodeAt(0)
                );
            }
            return {
                ...state,
                allCourses: todos_cursosOrdenados,
                courses: cursosOrdenados,
            };

        case GET_CATEGORY_ALL:
            return {
                ...state,
                categories: payload,
            };

        case POST_CATEGORY:
            return {
                ...state,
                message: payload.message,
            };

        case DELETE_CATEGORY:
            return { ...state, message: payload}
            
        case ERROR:
            return {
                ...state,
                error: payload.message,
            };
        case POST_COURSE:
            return {
                ...state,
                message: payload.message,
            };

        case CLEAN_MESSAGE:
            return {
                ...state,
                error: "",
                message: "",
            };

            case CLEAR_USER:
            return {
                ...state,
                user:{},
            };

        case CLEAR_COURSES:
            return {
                ...state,
                allCourses: [],
                courses: [],
            };
        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: [],
            };
        case DARK_MODE:
            return {
                ...state,
                darkMode: payload,
            };

        case GET_FAVORITES:
            return { ...state, favorites: payload };

        case DELETE_COURSE:
            return { ...state, message: payload };

            //productos
        case GET_PRODUCTS:
            return { ...state, products: payload, productsCopy: payload };

   

        case GET_PRODUCTS_BY_NAME:
            return { ...state, products: payload };

        case DELETE_PRODUCT:
            return { ...state, message: payload};
            
        case POST_PRODUCT:
            return {
                ...state,
                message: payload.message,
            };

            case PUT_PRODUCTS:
                return { ...state, message: payload };

        case FILTER_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                products: state.products.filter((product) => product?.Category?.name === payload)
            };

        case FILTER_PRODUCTS_BY_PRICING:
            return { ...state, products: state.products.filter((product) => product.price >= payload[0] && product.price <= payload[1] )}

        case SORT_PRODUCTS:
            const productosOrdenados = [...state.products];
            const  todos_productosOrdenados= [...state.productsCopy]
            
            if (payload === "ascendente") {
                productosOrdenados.sort(
                    (a, b) =>
                        a.name.toLowerCase().charCodeAt(0) -
                        b.name.toLowerCase().charCodeAt(0)
                );
                productosOrdenados.sort(
                    (a, b) =>
                        a.name.toLowerCase().charCodeAt(0) -
                        b.name.toLowerCase().charCodeAt(0)
                );
            } else if (payload === "descendente") {
                productosOrdenados.sort((a, b) =>  b.name.toLowerCase().charCodeAt(0)- a.name.toLowerCase().charCodeAt(0));
            }

            return {
                ...state,
                products: productosOrdenados,
                productsCopy: todos_productosOrdenados,
            };

        //////////////////         MODIFICADO              //////////////////////////////
        case PUT_PRODUCTS:
            return { ...state, message: payload };
        //////////////////////////////////////////////////////////////////////////////////////////
        case GET_USER_BY_EMAIL:
            return {
                ...state,
                user: payload,
            };

        case SET_CART:
            return {
                ...state,
                cart: payload,
            };

        case CLEAR_CART:
            return {
                ...state,
                cart: payload,
            };

        case TOGGLE_SHOPBAG:
            return {
                ...state,
                shopbag: payload,
            };
        case SET_HIGHLIGHT:
            return {
                ...state,
                highlightedItem: payload
            }

        case CLEAR_HIGHLIGHT:
            return {
                ...state,
                highlightedItem: null
            }
        
        case METAMASK_ADDRESS:
            return {
                ...state,
                metamaskaddress: payload,
            };

        //////////////////         MODIFICADO              //////////////////////////////

        case GET_SUSCRIPTIONS:
            return {
                ...state,
                subscriptions: payload,
            };
        case DELETE_SUSCRIPTION:
            return {
                ...state,
                message: payload,
            };
        case PUT_SUSCRIPTION:
            return {
                ...state,
                message: payload.message
            };

        case POST_SUSCRIPTION:
            return {
                ...state,
                message: payload.message,
            };
        case POST_USER:
            return {
                ...state,
                message: payload.message,
            };

        case PUT_USER:
            return {
                ...state,
                message: payload.message
            }

        case DELETE_USER:
            return{
                ...state, message:payload
            }
        ////////////////////////////////////////////////////////////////////////////////////

        case ADMIN_MESSAGE: 
            return {
                ...state, message: payload
            }
        case PUT_COURSE:
            return {
                ...state, message: payload
            }

        //tecnology
        case  DELETE_TECNOLOGY : 
            return {...state, message: payload}

        case POST_TECNOLOGY:
                return {...state,message: payload}

        case GET_TECNOLOGY_ALL:
                return {...state,tecnology:payload}
                
        default:
            return { ...state };
    }
}
