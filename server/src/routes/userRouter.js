const userRouter = require("express").Router();

//controller
const { GetUsers } = require("../controllers/User/getUser");
const { PostUser } = require("../controllers/User/postUser");
const { Login } = require("../controllers/User/login");

userRouter.get("/", GetUsers);

userRouter.post("/", PostUser);

userRouter.get("/Login", Login);

module.exports = userRouter;