//Router
const courseRouter = require("express").Router();

//controllers
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
//__________________________________________________

courseRouter.get('/', getCourse);

courseRouter.post('/', postCourse);

courseRouter.delete('/', deleteCourse);


module.exports = courseRouter;