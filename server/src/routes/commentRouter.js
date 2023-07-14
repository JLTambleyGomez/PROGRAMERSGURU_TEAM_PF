//Router
const commentRouter = require("express").Router();

const { deleteComment } = require("../controllers/Comment/deleteComment");
const { getAllComments } = require("../controllers/Comment/getAllComments");
//controllers
const { getComment } = require("../controllers/Comment/getComment");
const { postComment } = require("../controllers/Comment/postComment");
const { putComment } = require("../controllers/Comment/putComment");

//routes
commentRouter.post("/:courseId", postComment);

commentRouter.get("/", getAllComments);

commentRouter.get("/:id", getComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.put("/:id", putComment);

module.exports = commentRouter;
