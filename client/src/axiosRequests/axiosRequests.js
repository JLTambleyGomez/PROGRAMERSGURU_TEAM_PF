import axios from "axios";

//COURSES:
export const getCoursesAllRequest = async () => {
    const { data } = await axios.get("http://localhost:3001/course")
    return data;
}

export const getCoursesByNameRequest = async (title) => {
    console.log(title)
    const { data } = await axios.get(`http://localhost:3001/course/title?title=${title}`);
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
    const { data } = await axios.delete(`http://localhost:3001/category/${id}`);
    return data;
}