import {
//COURSES:
    getCoursesAllRequest, 
    getCoursesByNameRequest, 
    getCoursesByIdRequest,
    postCourseRequest,
    deleteCourseRequest,
    putCourseRequest,
//CATEGORIES:
    getCategoriesAllRequest, 
    postCategoriesRequest, 
    deleteCategoriesRequest, 
//FAVORITES
    getFavoritesRequest,
//Products
    getProductsRequest,
    getProductsByNameRequest,
    postProductsRequest,
    deleteProductsRequest,
    putProductsRequest,
//user
   getUserByEmailRequest,
//comments
    getCommentsByCourse,
    getCommentsByUser,
//suscriptions
    getSubscriptionsRequest,
    deleteSuscriptionRequest,
    putSuscriptionRequest,
    postSuscriptionRequest,
    //sendEmails
    sendEmail,
    
} from "../axiosRequests/axiosRequests";
//_________________________________ _________________

//ACTIONS:
//COURSES:
    export const CLEAR_COURSES = "CLEAR_COURSES";
    export const CLEAN_MESSAGE = "CLEAN_MESSAGE";
    export const GET_COURSES_BY_ID = "GET_COURSES_BY_ID";
    export const POST_COURSE = "POST_COURSE"
    export const GET_COURSES_ALL = "GET_COURSES_ALL";
    export const GET_COURSES_BY_NAME = "GET_COURSES_BY_NAME";
    export const DELETE_COURSE = "DELETE_COURSE";
    export const FILTER_COURSES_BY_LANGUAGE = "FILTER_COURSES_BY_LANGUAGE";
    export const FILTER_COURSES_BY_PRICING = "FILTER_COURSES_BY_PRICING";
    export const ORDER_COURSES = "ORDER_COURSES";
    export const PUT_COURSE = "PUT_COURSE"

//CATEGORIES:
    export const GET_CATEGORIES_ALL = "GET_CATEGORIES_ALL";
    export const POST_CATEGORIES = "POST_CATEGORIES";
    export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
    

//ERRORS:
    export const ERROR = "ERROR";

//DARK MODE:
    export const DARK_MODE = "DARK_MODE";

//FAVORITES:
    export const GET_FAVORITES = "GET_FAVORITES";
    export const DELETE_FAVORITE = "DELETE_FAVORITE";
    export const PUT_FAVORITE = 'PUT_FAVORITE'
    export const POST_FAVORITE = "POST_FAVORITE" 

//USER:
    export const EDIT_USER_DATA = "EDIT_USER_DATA"
    export const GET_USER_BY_EMAIL= "GET_USER_BY_EMAIL";
    export const SET_USER_EMAIL = "SET_USER_EMAIL";
    export const SET_TOKEN = "SET_TOKEN";

//COMMENTS:
    export const GET_COMMENTS_BY_USER = "GET_COMMENTS_BY_USER"
    export const GET_COMMENTS_BY_COURSE = "GET_COMMENTS_BY_COURSE"
    
//PRODUCTS:
    export const GET_PRODUCTS = "GET_PRODUCTS";
    export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
    export const POST_PRODUCTS = "POST_PRODUCTS";
    export const DELETE_PRODUCT = "DELETE_PRODUCT";
    export const FILTER_PRODUCTS_BY_CATEGORY= "FILTER_PRODUCTS_BY_CATEGORY";
    export const FILTER_PRODUCTS_BY_PRICING = "FILTER_PRODUCTS_BY_PRICING";
    export const SORT_PRODUCTS = "SORT_PRODUCTS";
    export const PUT_PRODUCTS = "PUT_PRODUCTS"

//CART:
    export const SET_CART= "SET_CART";
    export const CLEAR_CART = "CLEAR_CART";

//SHOPBAG:
    export const TOGGLE_SHOPBAG = "TOGGLE_SHOPBAG";

//METAMASK:
export const METAMASK_ADDRESS ="METAMASK_ADDRESS"

//SUSCRIPTIONS
export const GET_SUSCRIPTIONS = "GET_SUSCRIPTIONS";
export const DELETE_SUSCRIPTION = "DELETE_SUSCRIPTION";
export const PUT_SUSCRIPTION = "PUT_SUSCRIPTION";
export const POST_SUSCRIPTION = "POST_SUSCRIPTION";

//__________________________________________________
//ACTION CREATORS:

//COURSES_____________________________________________//
export const get_courses_all = () => {
    return async (dispatch) => {
        try {
            const data = await getCoursesAllRequest() // request
            return dispatch({
                type: GET_COURSES_ALL,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export const get_courses_by_name = (name) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getCoursesByNameRequest(name); // request
            return dispatch({
                type: GET_COURSES_BY_NAME,
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

export const get_courses_by_id = (id) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getCoursesByIdRequest(id); // request
            return dispatch({
                type: GET_COURSES_BY_ID,
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

export const post_course = (datos) => {
    return async (dispatch) => {
        try {
            const data = await postCourseRequest(datos) // request
            return dispatch({
                type: POST_COURSE,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export const delete_course = (id) => { // request
    return async function (dispatch) {
        try {
            const data = await deleteCourseRequest(id);
            return dispatch({
                type: DELETE_COURSE,
                payload: data.message   ,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

///////////////////// PUT COURSE //////////////////////////
export const put_course = (id, course) => {
    return async function (dispatch) {
        try {
            const data = await putCourseRequest(id,course)
            return dispatch({
                type: PUT_COURSE,
                payload: data.message
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message
            })
        }
    }

}

export const filter_courses_by_language = (language) => {
    return {
        type: FILTER_COURSES_BY_LANGUAGE,
        payload: language
    }
}

export const filter_courses_by_price = (price) => {
    if (price === "true") {
        price = true
    } else if(price==="false") {
        price = false
    }
    return {
        type: FILTER_COURSES_BY_PRICING,
        payload: price
    }
}

export const order_courses = (direccion) => {
    return {
        type: ORDER_COURSES,
        payload: direccion
    }
}

//CATEGORIES_____________________________________________//
export const get_categories = () => { // request
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
                payload: "get error",
            });
        }
    };
}

export const post_categories = (technology) => { // request
    return async function (dispatch) {
        try {
            const data = await postCategoriesRequest(technology);
            return dispatch({
                type: POST_CATEGORIES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "post error", // error.response.data.message
            });
        }
    };
}

export const delete_categories = (id) => { // request
    return async function (dispatch) {
        try {
            const data = await deleteCategoriesRequest(id);
            return dispatch({
                type: DELETE_CATEGORIES,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "delete error",
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

///////////////////ACTIONS CLEAR/////////////////////////////////////////////////////////////////////////////////////////

export const clearMessage = () => {
    return function (dispatch) {
        return dispatch({
            type: CLEAN_MESSAGE,
        });
    };
  }

export const clearCourses = () => {
    return {
        type: CLEAR_COURSES,
    };
}

export const clear_cart = () => {

    return {
        type: CLEAR_CART,
    }
}

//FAVOURITES_____________________________________________//

export const get_Favorites_Request = (id) => { //hace un req por cursos por nombre
    return async (dispatch) => {
        try {
            const data = await getFavoritesRequest(id); // request
            return dispatch({
                type: GET_FAVORITES,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message,
            });
        }
    };
}

// export const delete_favorite = (id) => {

//         return async (dispatch) => {
//             try {
//                 const data = await de(id); // request
//                 return dispatch({
//                     type: GET_FAVORITES,
//                     payload: data,
//                 });
//             } catch (error) {
//                 return dispatch({
//                     type: ERROR,
//                     payload: error.message,
//                 });
//             }
//         };
//     }

// export const put_favorite = (id, favorite) =>{}

// export const post_favorite =(favorite) =>{}


//PRODUCTS_____________________________________________//

export const get_products_all = () => {
    return async (dispatch) => {
        try {
            const data = await getProductsRequest() // request
            return dispatch({
                type: GET_PRODUCTS,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message // error.response.data.message,
            });
        }
    }
}

export const get_products_by_name = (name) => {
    return async (dispatch) => {
        try {
            const products = await getProductsByNameRequest(name);
            return dispatch({
                type: GET_PRODUCTS_BY_NAME,
                payload: products
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message // error.response.data.message,
            });
        }
    }
}

export const post_Products = (datos) => {
    return async (dispatch) => {
        try {
            const data = await postProductsRequest(datos) // request
            console.log(data)
            return dispatch({
                type: POST_PRODUCTS,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export const delete_Products = (id) => { // request
    return async function (dispatch) {
        try {
            const data = await deleteProductsRequest(id);
            return dispatch({
                type: DELETE_PRODUCT,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
}

export const sort_products = (sort) => {
    return {
        type: SORT_PRODUCTS,
        payload: sort
    }
}

///////////////////// PUT PRODUCT //////////////////////////
export const put_Products = (id, product) => {
    return async function (dispatch) {
        try {
            const data = await putProducts(id,product)
            console.log(data)
            return dispatch({
                type: PUT_PRODUCT,
                payload: data.message
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message
            })
            
        }
    }

}

//USER___________________________________________________________________//

export const get_User_By_Email = (email) => {
    return async function (dispatch) {
        try {
            const data = await getUserByEmailRequest(email);
            return dispatch({
                type: GET_USER_BY_EMAIL,
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

//CART_____________________________________________//

export const set_cart = () => {
    return {
        type: SET_CART,
        payload: JSON.parse(localStorage.getItem("cart"))
    }
}

//SHOPBAG_____________________________________________//

export const toggle_shopbag = (status) => {
	return {
		type: TOGGLE_SHOPBAG,
		payload: status
	}
}


//Comments

export const get_comments_by_user = (userId)=>{
    return async function (dispatch) {
        try {
            const data = await getCommentsByUser(userId);
            return dispatch({
                type: GET_COMMENTS_BY_USER,
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

export const get_comments_by_course = (courseId)=>{
    return async function (dispatch) {
        try {
            const data = await getCommentsByCourse(courseId);
            return dispatch({
                type: GET_COMMENTS_BY_COURSE,
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

export const set_metamask_address = (address) => {
        return {
            type: METAMASK_ADDRESS,
            payload: address
        }   
}


//SUBSCRIPTIONS 

export const get_suscriptions = () => {
    return async function (dispatch)  {
        try {
            const data = await getSubscriptionsRequest();
            return dispatch ({
                type: GET_SUSCRIPTIONS,
                payload: data
            })

        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}

export const put_suscription = (id,suscription) => {
    return async function (dispatch) {
        try {
            const data = await putSuscriptionRequest(id, suscription)
            return dispatch({
                type:PUT_SUSCRIPTION,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR, 
                payload: error.response.data.message
            })
        }
    }
}

export const delete_suscription = (id) => {
    return async function (dispatch) {
        try {
            const data = await deleteSuscriptionRequest(id)
            return dispatch ({
                type: DELETE_SUSCRIPTION,
                payload: data   
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message
            })
        }
    }
}

export const post_suscription = (id,suscription) => {
    return  async function (dispatch) {
        try {
            const data = await postSuscriptionRequest(id,suscription)
            return dispatch({
                type: POST_SUSCRIPTION,
                payload: data
            })
        } catch (error) {
            return dispatch({
                type: ERROR, 
                payload: error.response.data.message
            })
        }
    }
}


//SHOP FILTERS_________________________________________//
export const filter_product_by_category = (category) => {
    return {
        type: FILTER_PRODUCTS_BY_CATEGORY,
        payload: category
    }
}
export const filter_product_by_price = (price) => {
    return {
        type: FILTER_PRODUCTS_BY_PRICING,
        payload: price
    }
}

