const userRouter = require("express").Router();

//controller
const {signUp} = require("../controllers/User/signUp")

// const middleware = require("../middleware/index");
// userRouter.use(middleware.decodeToken);

// router.get("/loginwithgoogle", logInWithGoogle);
// router.get("/login", login);
userRouter.post("/signup", signUp);

module.exports = userRouter;