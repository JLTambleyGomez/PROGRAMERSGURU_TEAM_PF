const router = require("express").Router();

const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");

const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");

router.use("/technology", technologyRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

router.use("/favorite", favoriteRouter);


router.get("/login", Login);

router.post("/login", PostUser);


module.exports = router;