const userRouter = require("express").Router();

//controller
const {signUp} = require("../controllers/User/signUp");
const { putPerfilUser } = require("../controllers/User/putPerfilUser");
const { getUser } = require("../controllers/User/getUser")
const { hideProfile } = require("../controllers/User/hideProfile")
const { makeAdmin } = require("../controllers/User/makeAdmin")
const { loginWithGoogle } = require("../controllers/User/loginWithGoogle")



//routes 
userRouter.get("/", getUser);
userRouter.put("/profile", putPerfilUser);
userRouter.put("/hide", hideProfile)  
userRouter.put("/admin", makeAdmin)
//userRouter.get("/user", GetUserByEmail)

//------------------Middleware----------------------
// const middleware = require("../middleware/index");
// userRouter.use(middleware.decodeToken);

userRouter.get("/loginWithGoogle", loginWithGoogle);
userRouter.post("/signup", signUp);

userRouter.put("/profile", putPerfilUser);
module.exports = userRouter;