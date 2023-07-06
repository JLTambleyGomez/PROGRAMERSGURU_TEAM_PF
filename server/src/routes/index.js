const { Router } = require("express");
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const router = Router();

const categoryRouter = require('./technologyRouter');
const courseRouter = require('./courseRouter');


router.use('/technology',categoryRouter)

router.use('/course',courseRouter)

router.get("/login", Login);

router.post("/login", PostUser);

module.exports = router;
