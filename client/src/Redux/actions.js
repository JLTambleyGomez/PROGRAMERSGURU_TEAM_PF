import {
//COURSES:
    getCoursesAllRequest, 
    getCoursesByNameRequest, 
//CATEGORIES:
    getCategoriesAllRequest, 
    postCategoriesRequest, 
    deleteCategoriesRequest, 
} from "../axiosRequests/axiosRequests";
//__________________________________________________

//ACTIONS:
//COURSES:
    export const GET_COURSES_ALL = "GET_COURSES_ALL";
    export const GET_COURSES_BY_NAME = "GET_COURSES_BY_NAME";
    export const FILTER_COURSES_BY_LANGUAGE = "FILTER_BY_LANGUAGE";
    export const FILTER_COURSES_BY_PRICING = "FILTER_BY_PRICING";
    export const ORDER_COURSES = "ORDER_COURSES";
//CATEGORIES:
    export const GET_CATEGORIES_ALL = "GET_CATEGORIES_ALL";
    export const POST_CATEGORIES = "POST_CATEGORIES";
    export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
    export const DARK_MODE = "DARK_MODE";
//ERRORS:
    export const ERROR = "ERROR";

//__________________________________________________
//ACTION CREATORS:

//COURSES:
export const get_courses_all = () => {
    return async (dispatch) => {
        try {
            const data = await getCoursesAllRequest() // request - completar endpoint en axiosRequests
            console.log(data)
            return dispatch({
                type: GET_COURSES_ALL,
                payload: data
            })
        } catch (error) {
            window.alert(error.response.data)
        }
    }
}

export const get_courses_by_name = (name) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getCoursesByNameRequest(name); // request - completar enpoint en axiosRequests
            return dispatch({
                type: GET_COURSES_BY_NAME,
                payload: data,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    };
}

export const filter_courses_by_language = (L) => {
    return {
        type: FILTER_COURSES_BY_LANGUAGE,
        payload: L
    }
}

export const filter_courses_by_price = (P) => {
    if (P === "true") {
        P = true
    } else {
        P = false
    }
    return {
        type: FILTER_COURSES_BY_PRICING,
        payload: P
    }
}

export const order_courses = (R) => {
    return {
        type: ORDER_COURSES,
        payload: R
    }
}

//CATEGORIES:
export function gET_CATEGORIES () { // request
    return async function (dispatch) {
        try {
            const data = await getCategoriesAllRequest(); 
            return dispatch({
                type: GET_CATEGORIES_ALL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export function pOST_CATEGORIES (category) { // request
    return async function (dispatch) {
        try {
            const data = await postCategoriesRequest(category);
            return dispatch({
                type: POST_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message, // error.response.data.message
            });
        }
    };
}

export function dELETE_CATEGORIES(id) { // request
    return async function (dispatch) {
        try {
            const data = await deleteCategoriesRequest(id);
            return dispatch({
                type: DELETE_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export const Dark_Mode = (payload) => {
    if (payload === true) {
        return {
            type: DARK_MODE,
            payload: true
        };
    } else if (payload === false) {
        return {
            type: DARK_MODE,
            payload: false
        };
    }
};