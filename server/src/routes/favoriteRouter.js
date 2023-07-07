//Router
const favoriteRouter = require("express").Router();

//controllers
// const { getCourse } = require("../controllers/Course/getCourse");
const { postFavorite } = require("../controllers/Favorite/postFavorite");
// const { deleteCourse } = require("../controllers/Course/deleteCourse");
// const { putCourse } = require("../controllers/Course/putCourse");
// const { getCourseByName } = require("../controllers/Course/getCourseByName");
// const {getCourseById}=require("../controllers/Course/getCourseById")

// favoriteRouter.get("/", getCourse);

// favoriteRouter.get("/title", getCourseByName);

// favoriteRouter.get("/:id", getCourseById)

favoriteRouter.post("/", postFavorite);

// favoriteRouter.delete("/:id", deleteCourse);

// favoriteRouter.put("/:id", putCourse);


module.exports = favoriteRouter;