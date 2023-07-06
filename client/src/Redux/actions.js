export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_COURSES_BY_LANGUAGE = "FILTER_COURSESBYLANGUAGE";
export const FILTER_PRICE = "FILTER_PRICE";
export const ORDER = "ORDER";
export const POST_CATEGORIES = "POST_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
export const ERROR = "ERROR";
export const DARK_MODE = "DARK_MODE";

import axios from "axios";

export function dELETE_CATEGORIES(id) {

    return async function (dispatch) {
      try {
        console.log(category)
        
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
        
        const { data } = await axios.post("http://localhost:3001/categories",category);
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

export const getCourses = (name) => {//hace un req por cursos por nombre
  const server= "SERVER/END-POINT";
  return async (dispatch) => {
      try {
        const {data}= await axios.get(server)
          return dispatch({
            type: 'GET_COURSES',
            payload: data,
        });
      } catch (error) {
        window.alert(error.response.data)
      }
  };
}


export const filter_courses = (L) => {
    return {
        type: FILTER_COURSES_BY_LANGUAGE,
        payload: L
    }
}

export const filter_price = (P) => {
    if (P==="true") {
        P=true
    } else {
        P=false
    }
    return {
        type: FILTER_PRICE,
        payload: P
    }
}

export const order = (R) => {
    return {
        type: ORDER,
        payload:R
    }
}
export const Dark_Mode = (payload) => {
  if (payload === true) {
    return {
      type: DARK_MODE,
      payload: true
    };
  } else {
    if (payload === false) {
      return {
        type: DARK_MODE,
        payload: false
      };
    }
  }
};
  
