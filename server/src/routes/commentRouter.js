//Router
const commentRouter = require("express").Router();

//controllers
const { deleteComment } = require("../controllers/Comment/deleteComment");
const { getCommentsByUser } = require("../controllers/Comment/getCommentsByUser");
const { getCommentsByCourse } = require("../controllers/Comment/getCommentsByCourse");
const { postComment } = require("../controllers/Comment/postComment");
const { putComment } = require("../controllers/Comment/putComment");

//routes
commentRouter.get("/:userId", getCommentsByUser);

commentRouter.get("/:courseId", getCommentsByCourse);

commentRouter.post("/:courseId", postComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.put("/:id", putComment);

module.exports = commentRouter;
