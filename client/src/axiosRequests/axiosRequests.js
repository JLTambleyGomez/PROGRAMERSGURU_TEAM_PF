import axios from "axios";

// Agregar encabezado de autorización a todas las solicitudes
let token = sessionStorage.getItem("accessToken");

// Intercepta todas las solicitudes salientes
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//COURSES______________________________
export const getCoursesAllRequest = async () => {
  const { data } = await axios.get("http://localhost:3001/course");
  return data;
};

export const getProducts = async () => {
  const { data } = await axios.get("http://localhost:3001/product");
  return data;
};

export const postProducts = async () => {
  const { data } = await axios.get("http://localhost:3001/product");
  return data;
};

export const deleteProducts = async (id) => {
  const { data } = await axios.delete(`http://localhost:3001/product/${id}`);
  return data;
};

export const login = async (userData) => {
  const { email, password } = userData;
  const URL = "http://localhost:3001/user/Login";
  const { data } = await axios(URL + `?email=${email}&password=${password}`);
  const { access } = data;
  return access;
};

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

//FAVORITES______________________________

export const getFavoritesRequest = async (id) => {
  const { data } = await axios.get(`http://localhost:3001/favorite/${id}`);
  const cursos = data[0].Courses;
  return cursos;
};

export const postFavoritesRequest = async () => {
  const ids = { idCourse: id, idUser: 1 };
  await axios.post("http://localhost:3001/favorite", ids);
  setFav(true);
};

export const deleteFavoritesRequest = async () => {
  await axios.delete(`http://localhost:3001/favorite/${id}`);
  setFav(false);
};

//user______________________________

export const getUserByEmail = async (email) => {
  const { data } = await axios.get("http://localhost:3001/user/email", email);
  return data;
};

//MERCADOPAGO______________________________

export const createOrder = async () => {
  const { data } = await axios.post("http://localhost:3001/create-order"); // agregar array de productos para postear, y modificar el controlador en el back.
  return data;
};
