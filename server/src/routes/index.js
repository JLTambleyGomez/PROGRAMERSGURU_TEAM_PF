const { Router } = require("express");
const { PostUser } = require("../controllers/postUser");
const { Login } = require("../controllers/login");
const { postCourse } = require("../controllers/postCourse");
const { postCategories } = require("../controllers/postCategories");
const { getCategories } = require("../controllers/getCategories");

const router = Router();

router.get("/login", Login);

router.post("/login", (req, res) => {
  PostUser(req, res);
});

router.post("/admin/categories", postCategories);

router.get("/admin/courses", getCategories);

router.post("/admin/courses", postCourse);

module.exports = router;
