//Router:
const router = require("express").Router();

//Controllers:
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const categoryRouter = require("./categoryRouter");
const courseRouter = require("./courseRouter");
//__________________________________________________

router.use("/category", categoryRouter);

router.use("/course", courseRouter);

router.get("/login", Login);

router.post("/login", PostUser);

module.exports = router;
