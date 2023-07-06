import axios from "axios";

//COURSES:
export const getCoursesAllRequest = async () => {
    const { data } = await axios.get(/* SERVER ENDPOINT */)
    return data;
}

export const getCoursesByNameRequest = async (name) => {
    const { data } = await axios.get(/* SERVER ENDPOINT */);
    return data;
}

//CATEGORIES:
export const getCategoriesAllRequest = async () => {
    const { data } = await axios("http://localhost:3001/category");
    return data;
}

export const postCategoriesRequest = async (category) => {
    const { data } = await axios.post("http://localhost:3001/category", category);
    return data;
}

export const deleteCategoriesRequest = async (id) => {
    const { data } = await axios.delete(`http://localhost:3001/category/:${id}`);
    return data;
}