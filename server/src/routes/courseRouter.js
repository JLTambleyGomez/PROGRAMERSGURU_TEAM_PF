//Router
const courseRouter = require("express").Router();

//controllers
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const { getCourseByName } = require("../controllers/Course/getCourseByName");

//__________________________________________________

courseRouter.get('/', getCourse);

courseRouter.post('/', postCourse);

courseRouter.delete('/', deleteCourse);

courseRouter.get("/title", getCourseByName )


module.exports = courseRouter;