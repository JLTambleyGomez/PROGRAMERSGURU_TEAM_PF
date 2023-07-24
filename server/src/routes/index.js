const router = require("express").Router();
const PagoRouter = require("./PagosRouter")
const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");
const paymentRouter = require("./paymentRouter");
const suscriptionRouter = require("./suscriptionRouter");
const middleware = require("../middleware/index");
const categoryRouter = require("./categoryRouter");

router.use(middleware.decodeToken)

router.use ("/Pagos", PagoRouter);

router.use("/technology", technologyRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

router.use("/favorite", favoriteRouter);

router.use("/user", userRouter);

router.use("/comment", commentRouter);

router.use("/payment", paymentRouter);

router.use("/subscription", suscriptionRouter);

router.use("/category", categoryRouter);


module.exports = router;
