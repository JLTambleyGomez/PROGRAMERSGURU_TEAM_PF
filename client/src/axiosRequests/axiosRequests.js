import axios from "axios";
import URL from "../../URL.JS";
//HOST:
// Agregar encabezado de autorización a todas las solicitudes
let token = localStorage.getItem("accessToken");

// Intercepta todas las solicitudes salientes
axios.interceptors.request.use(function (config) {
    if (
        config.url ===
        "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    )
        return config;
    if (config.method === "get" && config.url.startsWith(`${URL}/course`))
        return config;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//COURSES______________________________
export const getCoursesAllRequest = async () => {
    const { data } = await axios.get("/course");
    return data;
};

export const getEthvalue = async () => {
    const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
    );

    const ethUSDTPrice = parseFloat(response.data.price);

    return ethUSDTPrice;
};

export const getProductsRequest = async () => {
    const { data } = await axios.get("/product");
    return data;
};

export const postProductRequest = async (product) => {
  const { data } = await axios.post("/product", product);
  return data;
};

export const deleteProductsRequest = async (id) => {
  const { data } = await axios.delete(`/product/${id}`);
  return data;
};

export const getProductsByNameRequest = async (name) => {
  const { data } = await axios(`/product/name/${name}`);
  return data;
};
//////////////   PUT PRODUCTS   ////////////
export const putProductsRequest = async (id, product) => {
  const { data } = await axios.put(
      `/product/${id}`,
      product
  );
  return data;
};

export const postCourseRequest = async (datos) => {
  const { data } = await axios.post("/course", datos);
  return data;
};

export const getCoursesByNameRequest = async (name) => {
  try {
    const response = await axios.get(
      `/course/title?title=${name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCoursesByIdRequest = async (id) => {
    const { data } = await axios.get(`/course/${id}`);
    return data;
};

///////////// PUT COURSE ////////////
export const putCourseRequest = async (id,course)=>{
  const {data} = await axios.put(`/course/${id}`, course)
  return data;
}

//Tecnology______________________________
export const getTecnologyAllRequest = async () => {
  const { data } = await axios("/technology");
  return data;
};

export const postTecnologyRequest = async (technology) => {
  const { data } = await axios.post(
    "/technology",
    technology
  );
  return data;
};

export const deleteTecnologyRequest = async (id) => {
  const { data } = await axios.delete(`/technology/${id}`);
  return data;
};
export const deleteCourseRequest = async (id) => {
  const { data } = await axios.delete(`/course/${id}`);
  return data;
};

/////////////////////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS
export const getSubscriptionsRequest = async () => {
  const {data} = await axios.get("/subscription")
  return data;
}

export const deleteSuscriptionRequest = async (id) => {
  const {data} = await axios.delete(`/subscription/${id}`)
  console.log(data);
  return data;
}

export const putSuscriptionRequest = async (id, suscription) => {
  const {data} = await axios.put(`/subscription/${id}`, suscription)
  return data;
}

export const postSuscriptionRequest = async (suscription) => {
  const { data } = await axios.post(
      "/subscription",
      suscription
  );
  return data;
};



//FAVORITES______________________________

export const getFavoritesRequest = async (userId) => {
  const { data } = await axios.get(`/favorite/${userId}`);
  return data;
};

export const postFavoriteRequest = async (ids) => {
  const {data} = await axios.post("/favorite", ids);
  return data
};

export const deleteFavoriteRequest = async (ids) => {
  const {data} = await axios.post("/favorite/delete", ids);
  return data
};

//user______________________________

export const getUserByEmailRequest = async (email) => {
  const { data } = await axios.get(`/user?email=${email}`);
  return data;
};

export const getAllUsersRequest = async () => {
  const {data} = await axios.get(`/user/all`)
  return data
}

export const putUserRequest = async ( user) => {
  console.log(user);
  const {data} = await axios.put(`/user/profile`, user )
  return data 
}

export const postUserRequest = async (user) => {
  const {data} = await axios.post(`/user/signup`, user)
  return data
}

export const hideUserProfileRequest = async (email) => {
    console.log(email);
    const { data } = await axios.put(`/user/hide`, {email});
    console.log(data);
    return data;
};

export const adminUserRequest = async (user) => {
    const { data } = await axios.put(`/user/admin`, user);
    return data;
};


export const deleteUserRequest = async (id) => {
  console.log({id});
  const { data } = await axios.delete(`/user`, { data: { id } });
  return data;
}

//MERCADOPAGO______________________________

export const createOrder = async () => {
  const { data } = await axios.post("/create-order"); // agregar array de productos para postear, y modificar el controlador en el back.
  return data;
};

//Comments

export const getCommentsByCourse = async (courseId) => {
  const { data } = await axios.get(`/comment/course/${courseId}`);
  return data;
};

export const getCommentsByUser = async (userId) => {
  const { data } = await axios.get(`/comment/user/${userId}`);
  return data;
};

export const postComment = async (courseId, commentData) => {
  const { data } = await axios.post(`/comment/${courseId}`, commentData);
  return data;
}

export const putComment = async (id, commentData) => {
  const { data } = await axios.put(`/comment/${id}`, commentData);
  return data;
}

export const deleteComment = async (id) => {
  const { data } = await axios.delete(`/comment/${id}`);
  return data;
}

export const computeCourseRating = async (courseId) => {
  const { data } = await axios.put(`/comment/course/${courseId}`);
  return data;
}



export const sendEmail = async (carta) => {
  console.log(carta)
  const { data } = await axios.post(`/user/sendEmail`, carta);
  return data;
};
// // // 
export const editUserData = async (userData) => {
    const { data } = await axios.put("/user/profile", userData);
    return data;
};

export const makeAdminUser = async (user) => {
    const { data } = await axios.put(`/user/admin`, user);
    console.log(data);
    return data;
};


//Category
export const getCategoryAllRequest = async () => {
  const {data} = await axios.get(`/category`)
  return data
}

export const postCategoryRequest = async (category) => {
  const {data} = await axios.post(`/category`, category)
  return data
}

export const deleteCategoryRequest = async (id) => {
  const {data} = await axios.delete(`/category/${id}`)
  return data
}

export const getProductByIdRequest = async (id) => {  
  const { data } = await axios.get(`/product/${id}`);
  return data;
};

//Metamask
export const getMetamaskFeedback = async ({compra, transaction, email}) => {  
 
  const { data } = await axios.post(`/Pagos/feedbackmetamask?payment_id=${transaction}&email=${email}`, {compra});
  return data;
};

export const getMercadopagoFeedback = async ({compra, email, paymentId, status, merchantOrderId}) => {  
 
  const { data } = await axios.post(`/Pagos/feedbackmercadopago/${email}?payment_id=${paymentId}&status=${status}&merchant_order_id=${merchantOrderId}&email=${email}`, {compra});;
  return data;
};

export const getAllPayments = async () => {
  const { data } = await axios.get("/payment/pagos/all");
  console.log(data);
  return data;
};