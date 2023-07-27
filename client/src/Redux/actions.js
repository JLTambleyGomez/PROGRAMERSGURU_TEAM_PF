import {
    //COURSES:
    getCoursesAllRequest,
    getCoursesByNameRequest,
    getCoursesByIdRequest,
    postCourseRequest,
    deleteCourseRequest,
    putCourseRequest,
    //CATEGORIES:
    getCategoryAllRequest,
    postCategoryRequest,
    deleteCategoryRequest,

    //TECNOLOGY
    getTecnologyAllRequest,
    postTecnologyRequest,
    deleteTecnologyRequest,

    //FAVORITES
    getFavoritesRequest,
    //Products
    getProductsRequest,
    getProductsByNameRequest,
    postProductRequest,
    deleteProductsRequest,
    putProductsRequest,
    //user
    getUserByEmailRequest,
    postUserRequest,
    putUserRequest,
    deleteUserRequest,
    //comments
    getCommentsByCourse,
    getCommentsByUser,
    //suscriptions
    getSubscriptionsRequest,
    deleteSuscriptionRequest,
    putSuscriptionRequest,
    postSuscriptionRequest,
    
} from "../axiosRequests/axiosRequests";
//_________________________________ _________________

//ACTIONS:
//COURSES:
export const CLEAR_USER = "CLEAR_USER";
export const CLEAR_COURSES = "CLEAR_COURSES";
export const CLEAN_MESSAGE = "CLEAN_MESSAGE";
export const GET_COURSE_BY_ID = "GET_COURSE_BY_ID";
export const POST_COURSE = "POST_COURSE";
export const GET_COURSES_ALL = "GET_COURSES_ALL";
export const GET_COURSES_BY_NAME = "GET_COURSES_BY_NAME";
export const DELETE_COURSE = "DELETE_COURSE";
export const FILTER_COURSES_BY_LANGUAGE = "FILTER_COURSES_BY_LANGUAGE";
export const FILTER_COURSES_BY_PRICING = "FILTER_COURSES_BY_PRICING";
export const ORDER_COURSES = "ORDER_COURSES";
export const PUT_COURSE = "PUT_COURSE";

//TECNOLOGY
export const GET_TECNOLOGY_ALL = "GET_TECNOLOGY_ALL";
export const POST_TECNOLOGY = "POST_TECNOLOGY";
export const DELETE_TECNOLOGY = "DELETE_TECNOLOGY";

//CATEGORIES:
export const GET_CATEGORY_ALL = 'GET_CATEGORY_ALL'
export const POST_CATEGORY = 'POST_CATEGORY'
export const DELETE_CATEGORY = "DELETE_CATEGORY" 

//ERRORS:
export const ERROR = "ERROR";

//DARK MODE:
export const DARK_MODE = "DARK_MODE";

//FAVORITES:
export const GET_FAVORITES = "GET_FAVORITES";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const PUT_FAVORITE = "PUT_FAVORITE";
export const POST_FAVORITE = "POST_FAVORITE";

//USER:
export const EDIT_USER_DATA = "EDIT_USER_DATA";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_TOKEN = "SET_TOKEN";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER"
export const MAKE_ADMIN = "MAKE_ADMIN";
export const DELETE_USER = "DELETE_USER";

//COMMENTS:
export const GET_COMMENTS_BY_USER = "GET_COMMENTS_BY_USER";
export const GET_COMMENTS_BY_COURSE = "GET_COMMENTS_BY_COURSE";

//PRODUCTS:
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const POST_PRODUCT = "POST_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";
export const FILTER_PRODUCTS_BY_PRICING = "FILTER_PRODUCTS_BY_PRICING";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const PUT_PRODUCTS = "PUT_PRODUCTS";

//admin
export const ADMIN_MESSAGE = 'ADMIN_MESSAGE'

//CART:
export const SET_CART = "SET_CART";
export const CLEAR_CART = "CLEAR_CART";

//SHOPBAG:
export const TOGGLE_SHOPBAG = "TOGGLE_SHOPBAG";

//HIGHLIGHTED ITEM:
export const SET_HIGHLIGHT = "SET_HIGHLIGHT";
export const CLEAR_HIGHLIGHT = "CLEAR_HIGHLIGHT";

//METAMASK:
export const METAMASK_ADDRESS = "METAMASK_ADDRESS";

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
            const data = await getCoursesAllRequest(); // request
            return dispatch({
                type: GET_COURSES_ALL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const get_courses_by_name = (name) => {
    //hace un req por cursos por nombre
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
};

export const get_course_by_id = (id) => {
    return async (dispatch) => {
        try {
            const data = await getCoursesByIdRequest(id); // request
            return dispatch({
                type: GET_COURSE_BY_ID,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const post_course = (datos) => {
    return async (dispatch) => {
        try {
            const data = await postCourseRequest(datos); // request
            return dispatch({
                type: POST_COURSE,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const delete_course = (id) => {
    // request
    return async function (dispatch) {
        try {
            const data = await deleteCourseRequest(id);
            return dispatch({
                type: DELETE_COURSE,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

///////////////////// PUT COURSE //////////////////////////
export const put_course = (id, course) => {
    return async function (dispatch) {
        try {
            const data = await putCourseRequest(id, course);
            return dispatch({
                type: PUT_COURSE,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const filter_courses_by_language = (language) => {
    return {
        type: FILTER_COURSES_BY_LANGUAGE,
        payload: language,
    };
};

export const filter_courses_by_price = (price) => {
    if (price === "true") {
        price = true;
    } else if (price === "false") {
        price = false;
    }
    return {
        type: FILTER_COURSES_BY_PRICING,
        payload: price,
    };
};

export const order_courses = (direccion) => {
    return {
        type: ORDER_COURSES,
        payload: direccion,
    };
};

//tencology_____________________________________________//
export const get_tecnology = () => {
    // request
    return async function (dispatch) {
        try {
            const data = await getTecnologyAllRequest();
            return dispatch({
                type: GET_TECNOLOGY_ALL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "get error",
            });
        }
    };
};

export const post_tecnology = (technology) => {
    // request
    return async function (dispatch) {
        try {
            console.log(technology)
            const data = await postTecnologyRequest(technology);
            return dispatch({
                type: POST_TECNOLOGY,
                payload: data.message
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "post error", // error.response.data.message
            });
        }
    };
};

export const delete_tecnology = (id) => {
    // request
    return async function (dispatch) {
        try {
            const data = await deleteTecnologyRequest(id);
            return dispatch({
                type: DELETE_TECNOLOGY,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: "delete error",
            });
        }
    };
};

export const Dark_Mode = (payload) => {

    const darkModeBoo = localStorage.getItem("darkMode")

    // if (payload === true) {
    //     return {
    //         type: DARK_MODE,
    //         payload: true
    //     };
    // } else if (payload === false) {
    //     return {
    //         type: DARK_MODE,
    //         payload: false
    //     };
    // }
    return {
        type: DARK_MODE,
        payload: darkModeBoo
    }
};

///////////////////ACTIONS CLEAR/////////////////////////////////////////////////////////////////////////////////////////

export const clearUser = () => {
    return function (dispatch) {
        return dispatch({
            type: CLEAR_USER,
        });
    };
};

export const clearMessage = () => {
    return function (dispatch) {
        return dispatch({
            type: CLEAN_MESSAGE,
        });
    };
};

export const clearCourses = () => {
    return {
        type: CLEAR_COURSES,
    };
};

export const clear_cart = () => {
    return {
        type: CLEAR_CART,
    };
};

export const clear_products = () =>{
    return {
        type: CLEAR_PRODUCTS
    }
}

//FAVOURITES_____________________________________________//

export const get_Favorites_Request = (id) => {// deprecado
    return async (dispatch) => {
        try {
            const data = await getFavoritesRequest(id);
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
};

export const post_Favorite_Request = (ids) => { 
    return async (dispatch) => {
        try {
            const data = await postFavoriteRequest(ids);
            return dispatch({
                type: POST_FAVORITE,
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

export const delete_Favorite_Request = (ids) => { 
    return async (dispatch) => {
        try {
            const data = await deleteFavoriteRequest(ids); 
            return dispatch({
                type: DELETE_FAVORITE,
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

//PRODUCTS_____________________________________________//

export const get_products_all = () => {
    return async (dispatch) => {
        try {
            const data = await getProductsRequest(); // request
            return dispatch({
                type: GET_PRODUCTS,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message, // error.response.data.message,
            });
        }
    };
};




export const get_products_by_name = (name) => {
    return async (dispatch) => {
        try {
            const products = await getProductsByNameRequest(name);
            return dispatch({
                type: GET_PRODUCTS_BY_NAME,
                payload: products,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.message, // error.response.data.message,
            });
        }
    };
};

export const post_Product = (datos) => {
    return async (dispatch) => {
        try {
            const data = await postProductRequest(datos); // request
            console.log(data);
            return dispatch({
                type: POST_PRODUCT,
                payload: data
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const delete_Products = (id) => {
    // request
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
};

export const sort_products = (sort) => {
    return {
        type: SORT_PRODUCTS,
        payload: sort,
    };
};

///////////////////// PUT PRODUCT //////////////////////////
export const put_Products = (id, product) => {
    return async function (dispatch) {
        try {
            const data = await putProductsRequest(id, product);
            console.log(data);
            return dispatch({
                type: PUT_PRODUCTS,
                payload: data.message,
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

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

export const delete_user = (id) => {
    return async function (dispatch) {
        try {
            const data = await deleteUserRequest({ id });
            return (dispatch({
                type: DELETE_USER,
                payload: data.message
            }))
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    }
}


//CART_____________________________________________//

export const set_cart = () => {
    return {
        type: SET_CART,
        payload: JSON.parse(localStorage.getItem("cart")),
    };
};

//SHOPBAG_____________________________________________//

export const toggle_shopbag = (status) => {
    return {
        type: TOGGLE_SHOPBAG,
        payload: status,
    };
};

//HIGHLIGHTED ITEM:

export const set_highlight = (id) => {
    return {
        type: SET_HIGHLIGHT,
        payload: id
    }
}

export const clear_highlight = () => {
    return {
        type: CLEAR_HIGHLIGHT
    }
}

//Comments

export const get_comments_by_user = (userId) => {
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
};

export const get_comments_by_course = (courseId) => {
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
};

export const set_metamask_address = (address) => {
    return {
        type: METAMASK_ADDRESS,
        payload: address,
    };
};

//SUBSCRIPTIONS

export const get_suscriptions = () => {
    return async function (dispatch) {
        try {
            const data = await getSubscriptionsRequest();
            return dispatch({
                type: GET_SUSCRIPTIONS,
                payload: data,
            });
        } catch (error) {
            if (error.message) {
                // Verificar si el error es un 404 para limpiar el estado
                if (error.response && error.response.status === 404) {
                    return dispatch({
                        type: GET_SUSCRIPTIONS,
                        payload: [], // Estado limpiado con un array vacío
                    });
                }
            }

            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const put_suscription = (id, suscription) => {
    return async function (dispatch) {
        try {
            const data = await putSuscriptionRequest(id, suscription);
            return dispatch({
                type: PUT_SUSCRIPTION,
                payload: data,
            });
        } catch (error) {
          
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const delete_suscription = (id) => {
    return async function (dispatch) {
        try {
            const data = await deleteSuscriptionRequest(id);
            return dispatch({
                type: DELETE_SUSCRIPTION,
                payload: data.message,
            });
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const post_suscription = (suscription) => {
    return async function (dispatch) {
        try {
            const data = await postSuscriptionRequest(suscription);
            console.log(data);
            return dispatch({
                type: POST_SUSCRIPTION,
                payload: data
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: ERROR,
                payload: error.response.data,
            });
        }
    };
};


//SHOP FILTERS_________________________________________//
export const filter_product_by_category = (category) => {
    console.log(category)
    return {
        type: FILTER_PRODUCTS_BY_CATEGORY,
        payload: category,
    };
};
export const filter_product_by_price = (price) => {
    return {
        type: FILTER_PRODUCTS_BY_PRICING,
        payload: price,
    };
};

export const post_user = (user) => {
    return async function (dispatch) {
        try {
            const data = await postUserRequest(user);
            console.log(data);
            return dispatch({
                type: POST_USER,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};

export const put_user = (user) => {
    return async function (dispatch) {
        try {
            const data = await putUserRequest(user);
            console.log(data);
            return dispatch({
                type: PUT_USER,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            return dispatch({
                type: ERROR,
                payload: error.response.data.message,
            });
        }
    };
};



 export const adminPanelMensajesLocales = (message) =>{
    console.log(message)    
    return  {
                type: ADMIN_MESSAGE,
                payload:message
            }

 }

 //Category
 export const get_categories = () => {
    return async function (dispatch) {
        try {
            const data = await getCategoryAllRequest()
            return dispatch({type: GET_CATEGORY_ALL, payload: data})
            
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error.response.data.message
            })
        }
    }
}

 export const postCategory = (category) => {
    return async function (dispatch) {
        try {
            console.log(category)
            const data = await postCategoryRequest(category)
            return dispatch({type: POST_CATEGORY, payload: data})
        } catch (error) {
            return dispatch({type: ERROR, payload: error.response.data.message})
        }
    }
}

 export const deleteCategory = (id) => {
    return async function (dispatch) {
        try {
            const data =  await deleteCategoryRequest(id)
            return dispatch({type:DELETE_CATEGORY, payload: data.message})
        } catch (error) {
            return dispatch ({type: ERROR, payload:error.response.data.message})
        }
    }
}