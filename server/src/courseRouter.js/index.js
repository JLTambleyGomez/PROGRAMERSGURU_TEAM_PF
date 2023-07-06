//Router:
const router = require("express").Router();

//Controllers:
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");

const categoryRouter = require('./categoryRouter');
//__________________________________________________

router.use('/category',categoryRouter )

router.get("/login", Login);

router.post("/login", PostUser);

router.get("/course", getCourse);

router.post("/course", postCourse);

router.delete("/course", deleteCourse);


module.exports = router;