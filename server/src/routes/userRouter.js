const userRouter = require("express").Router();

//controller
const { getUserByEmail } = require("../controllers/User/getUserByEmail")
const { getUsers } = require("../controllers/User/getUsers");
const { putPerfilUser } = require("../controllers/User/putPerfilUser");
const { hideProfile } = require("../controllers/User/hideProfile");
const { makeAdmin } = require("../controllers/User/makeAdmin");
const { loginWithGoogle } = require("../controllers/User/loginWithGoogle");
const { SendEmail } = require("../utils/sendEmail");
const { signUp } = require("../controllers/User/signUp");
const { deleteUser } = require("../controllers/User/deleteUser");

//routes 
userRouter.get("/", getUserByEmail);
userRouter.get("/all", getUsers);
userRouter.put("/profile", putPerfilUser);
userRouter.put("/hide", hideProfile)  
userRouter.put("/admin", makeAdmin)
userRouter.get("/loginWithGoogle", loginWithGoogle);
userRouter.post("/signup", signUp);
userRouter.get("/sendEmail", SendEmail); 
userRouter.delete("/", deleteUser);


module.exports = userRouter;