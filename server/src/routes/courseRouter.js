//Router
const courseRouter = require("express").Router();

//controllers
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const { putCourse } = require("../controllers/Course/putCourse");
const { getCourseByName } = require("../controllers/Course/getCourseByName");
const { getCourseById } = require("../controllers/Course/getCourseById")
const { addTechnology } = require("../controllers/Course/addTechnology");
const { removeTechnology } = require("../controllers/Course/removeTechnology");

courseRouter.get("/", getCourse);

courseRouter.get("/title", getCourseByName);

courseRouter.get("/:id", getCourseById)

courseRouter.post("/", postCourse);

courseRouter.delete("/:id", deleteCourse);

courseRouter.put("/:id", putCourse);

courseRouter.put("/tech/:id", addTechnology);

courseRouter.delete("/tech/:id", removeTechnology);

module.exports = courseRouter;