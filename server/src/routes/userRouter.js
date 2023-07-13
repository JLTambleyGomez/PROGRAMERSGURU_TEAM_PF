const userRouter = require("express").Router();

//controller
const {signUp} = require("../controllers/User/signUp")

const middleware = require("../middleware/index");
userRouter.use(middleware.decodeToken);
userRouter.get("/loginWithGoogle", async (req, res) => {
    try {
        const { user_id, name, picture, email } = req.user;

        return res.json({
            userData: {
                id: `${user_id}`,
                email: email,
                name: name,
                image: picture,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// userRouter.use(middleware.decodeToken);

// router.get("/loginwithgoogle", logInWithGoogle);
// router.get("/login", login);
userRouter.post("/signup", signUp);

module.exports = userRouter;