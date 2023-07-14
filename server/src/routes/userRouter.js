const userRouter = require("express").Router();

//controller
const {signUp} = require("../controllers/User/signUp");
const { putPerfilUser } = require("../controllers/User/putPerfilUser");
//const { GetUsers } = require("../controllers/User/GetUser")



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
//userRouter.get("/user", GetUsers);

userRouter.put("/profile", putPerfilUser);
module.exports = userRouter;