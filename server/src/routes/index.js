const router = require("express").Router();

const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentROuter");
const paymentRouter = require("./paymentRouter");
// const middleware = require("../middleware/index");

router.use("/technology", technologyRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

router.use("/favorite", favoriteRouter);

router.use("/user", userRouter);

router.use("/comment", commentRouter);

router.use("/payment", paymentRouter);

module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////
// router.use(middleware.decodeToken);
// router.get("/loginWithGoogle", async (req, res) => {
//     try {
//         const { user_id, name, picture, email } = req.user;

//         return res.json({
//             userData: {
//                 id: `${user_id}`,
//                 email: email,
//                 name: name,
//                 image: picture,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// });
