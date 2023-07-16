const router = require("express").Router();
const MercadoPagoRouter = require("./MercadoPagoRouter")
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

router.use(middleware.decodeToken)

router.use ("/Mp", MercadoPagoRouter);

router.use("/technology", technologyRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

router.use("/favorite", favoriteRouter);

router.use("/user", userRouter);

router.use("/comment", commentRouter);

router.use("/payment", paymentRouter);

router.use("/subscription", suscriptionRouter);

router.use("/mercadoPago", mecadoPagoRouter);

module.exports = router;
