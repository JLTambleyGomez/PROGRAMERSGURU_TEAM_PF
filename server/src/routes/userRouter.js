const userRouter = require("express").Router();

//controller
const {signUp} = require("../controllers/User/signUp");
const { getUser } = require("../controllers/User/getUser");
const { putPerfilUser } = require("../controllers/User/putPerfilUser");
const { loginWithGoogle } = require("../controllers/User/loginWithGoogle");
const { hideProfile } = require("../controllers/User/hideProfile");
const { makeAdmin } = require("../controllers/User/makeAdmin");

//routes 
userRouter.get("/", getUser);
userRouter.put("/profile", putPerfilUser);
userRouter.put("/hide", hideProfile)  
userRouter.put("/admin", makeAdmin)
userRouter.get("/loginWithGoogle", loginWithGoogle);
userRouter.post("/signup", signUp);

module.exports = userRouter;