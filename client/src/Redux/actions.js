import axios from "axios";
//__________________________________________________

//ACTIONS:
export const GET_COURSES = "GET_COURSES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE";
export const FILTER_BY_PRICING = "FILTER_BY_PRICING";
export const ORDER = "ORDER";
export const POST_CATEGORIES = "POST_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
export const ERROR = "ERROR";

//ACTION CREATORS:
export function dELETE_CATEGORIES(id) {
    return async function (dispatch) {
        try {
            // console.log(category)
            const { data } = await axios.delete(`http://localhost:3001/categories/:${id}`);
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

export function pOST_CATEGORIES(category) {
    return async function (dispatch) {
        try {
            console.log(category)

            const { data } = await axios.post("http://localhost:3001/categories", category);
            return dispatch({
                type: POST_CATEGORIES,
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

export function gET_CATEGORIES () {
    return async function (dispatch) {
        try {
            const { data } = await axios("http://localhost:3001/categories");
            return dispatch({
                type: GET_CATEGORIES,
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
// HACER UN GETCOURSESALL Y UN GETCOURSEBYNAME
export const getCourses = (name) => {//hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const server = "SERVER/END-POINT";
            const { data } = await axios.get(server);
            return dispatch({
                type: GET_COURSES,
                payload: data,
            });
        } catch (error) {
            window.alert(error.response.data);
        }
    };
}

export const filter_courses = (L) => {
    return {
        type: FILTER_BY_LANGUAGE,
        payload: L
    }
}

export const filter_price = (P) => {
    if (P === "true") {
        P = true
    } else {
        P = false
    }
    return {
        type: FILTER_BY_PRICING,
        payload: P
    }
}

export const order = (R) => {
    return {
        type: ORDER,
        payload: R
    }
}