const { Router } = require("express");
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");

const router = Router();

const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");

router.use("/category", technologyRouter); //cambiar a technology.

router.use("/course", courseRouter);

router.get("/login", Login);

router.post("/login", PostUser);

// router.use("/course", getCourse);

// router.post("/course", postCourse);

// router.delete("/course", deleteCourse);

module.exports = router;