const router = require("express").Router();
const MercadoPagoRouter = require("./MercadoPagoRouter");
const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");
const paymentRouter = require("./paymentRouter");
const suscriptionRouter = require("./suscriptionRouter");
const mecadoPagoRouter = require("./mecadoPagoRouter");
const middleware = require("../middleware/index");

//Controllers:
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");
const { getCourse } = require("../controllers/Course/getCourse");
const { postCourse } = require("../controllers/Course/postCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const categoryRouter = require("./categoryRouter");
const courseRouter = require("./courseRouter");
//__________________________________________________
router.use("/Mp", MercadoPagoRouter);

router.use("/category", categoryRouter);

router.use("/course", courseRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

module.exports = router;
