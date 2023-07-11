const router = require("express").Router();

const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");

const technologyRouter = require("./technologyRouter");
const courseRouter = require("./courseRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const userRouter = require("./userRouter");

router.use("/technology", technologyRouter);

router.use("/course", courseRouter);

router.use("/product", productRouter);

router.use("/favorite", favoriteRouter);

router.use("/user", userRouter);

router.get('/loginWithGoogle', (req, res) => {
	
	const {user_id, name, picture, email} = req.user;

	return res.json({
		userData: {
			id: user_id,
			name: name,
			nickName: name,
			image: picture,
			email: email,
			password: email,
		},
	});
})

module.exports = router;