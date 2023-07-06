//Router
const courseRouter = require("express").Router();

//controllers
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const { putCourse } = require("../controllers/Course/putCourse");
const { getCourseByName } = require("../controllers/Course/getCourseByName");

courseRouter.get("/", getCourse);

courseRouter.get("/title", getCourseByName);

courseRouter.post("/", postCourse);

courseRouter.delete("/:id", deleteCourse);

courseRouter.put("/:id", putCourse);

module.exports = courseRouter;
