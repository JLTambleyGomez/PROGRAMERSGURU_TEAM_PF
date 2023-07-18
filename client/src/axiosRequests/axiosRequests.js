import axios from "axios";
//HOST:
const URL = "http://localhost:3001"

// Agregar encabezado de autorización a todas las solicitudes
let token = localStorage.getItem("accessToken");

// Intercepta todas las solicitudes salientes
axios.interceptors.request.use(function (config) {
  if (config.url === "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT") return config;
  if (config.method === "get" && config.url.startsWith(`${URL}/course`)) return config;

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


//COURSES______________________________
export const getCoursesAllRequest = async () => {
  const { data } = await axios.get("http://localhost:3001/course");
  return data;
};

export const getEthvalue = async () =>{
  const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');

  const ethUSDTPrice = parseFloat(response.data.price);

  return ethUSDTPrice;
}

export const getProductsRequest = async () => {
  const { data } = await axios.get("http://localhost:3001/product");
  return data;
};

export const postProductsRequest = async (product) => {
  const { data } = await axios.get("http://localhost:3001/product", product);
  return data;
};

export const deleteProductsRequest = async (id) => {
  const { data } = await axios.delete(`http://localhost:3001/product/${id}`);
  return data;
};

//////////////   PUT PRODUCTS   ////////////
export const putProductsRequest = async (id, product) => {
  const {data} = await axios.put(`http://localhost:3001/product/${id}`, product)
  return data;

}

export const postCourseRequest = async (datos) => {
  const { data } = await axios.post("http://localhost:3001/course", datos);
  return data;
};

export const getCoursesByNameRequest = async (name) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/course/title?title=${name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCoursesByIdRequest = async (id) => {
  console.log(id);
  const { data } = await axios.get(`http://localhost:3001/course/${id}`);

  return data;
};

///////////// PUT COURSE ////////////
export const putCourseRequest = async (id,course)=>{
  const {data} = await axios.put(`http://localhost:3001/course/${id}`, course)
  return data;
}

//CATEGORIES______________________________
export const getCategoriesAllRequest = async () => {
  const { data } = await axios("http://localhost:3001/technology");
  return data;
};

export const postCategoriesRequest = async (technology) => {
  const { data } = await axios.post(
    "http://localhost:3001/technology",
    technology
  );
  return data;
};

export const deleteCategoriesRequest = async (id) => {
  const { data } = await axios.delete(`http://localhost:3001/technology/${id}`);
  return data;
};
export const deleteCourseRequest = async (id) => {
  const { data } = await axios.delete(`http://localhost:3001/course/${id}`);
  return data;
};

/////////////////////////////////////////////////////////////////////////////////
// SUBSCRIPTIONS
export const getSubscriptionsRequest = async () => {
  const {data} = await axios.get("http://localhost:3001/subscription")
  return data;
}

export const deleteSuscriptionRequest = async (id) => {
  const {data} = axios.delete(`http://localhost:3001/subscription/${id}`)
  return data;
}

export const putSuscriptionRequest = async (id, suscription) => {
  const {data} = axios.put(`http://localhost:3001/subscription/${id}`, suscription)
  return data;
}

export const postSuscriptionRequest = async (suscription) => {
  const {data} = axios.post("http://localhost:3001/subscription",suscription)
  return data;
}
//PRODUCTS_______________________________

export const getProductsByNameRequest = async (name) => {
  const { data } = await axios(`${URL}/product/name/${name}`)
  return data;
}

//FAVORITES______________________________

export const getFavoritesRequest = async (id) => {
  const { data } = await axios.get(`http://localhost:3001/favorite/${id}`);
  const cursos = data[0].Courses;
  return cursos;
};

export const postFavoritesRequest = async (ids) => {
  const {data} = await axios.post("http://localhost:3001/favorite", ids);

};

export const deleteFavoritesRequest = async () => {
  const {data} = await axios.delete(`http://localhost:3001/favorite/${id}`);
};

//user______________________________

export const getUserByEmailRequest = async (email) => {
  const { data } = await axios.get(`http://localhost:3001/user/?email=${email}`);
  return data;
};

export const getAllUsersRequest = async () => {
  const {data} = await axios.get(`http://localhost:3001/user/all`)
  return data
}


//   const {data} = await axios.delete(`http://localhost:3001/user/${id}`)
//   return data
// }

export const putUserRequest = async ( user) => {
  const {data} = await axios.put(`http://localhost:3001/user/profile`, user )
  return data 
}

export const postUserRequest = async (user) => {
  const {data} = await axios.post(`http://localhost:3001/user/signup`, user)
  return data
}

export const hideUserProfileRequest = async (user) => {
  const {data} = await axios.put(`http://localhost:3001/user/hide`, user)
  return data
}

export const adminUserRequest = async (user) => {
  const {data} =  await axios.put(`http://localhost:3001/user/admin`, user)
  return data
}


//MERCADOPAGO______________________________

export const createOrder = async () => {
  const { data } = await axios.post("http://localhost:3001/create-order"); // agregar array de productos para postear, y modificar el controlador en el back.
  return data;
};

//Comments

export const getCommentsByUser = async (userId) => {
  const { data } = await axios.get(`http://localhost:3001/comment/${userId}`);
  return data;
};

export const getCommentsByCourse = async (courseId) => {
  const { data } = await axios.get(`/comment/${courseId}`);
  return data;
}
//Post email_______________________//

export const sendEmail = async (carta) => {
  const { data } = await axios.post(`http://localhost:3001/user/sendEmail`, carta);
  return data;
};
// // // 
export const editUserData = async (userData) => {
  const { data } = await axios.put('/user/profile', userData);
  return data;
};