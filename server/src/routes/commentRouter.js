//Router
const commentRouter = require("express").Router();

const { deleteComment } = require("../controllers/Comment/deleteComment");
const { getCommentsByCourse } = require("../controllers/Comment/getCommentsByCourse");
const { getCommentsByUser } = require("../controllers/Comment/getCommentsByUser");
//controllers
const { getComment } = require("../controllers/Comment/getComment");
const { postComment } = require("../controllers/Comment/postComment");
const { putComment } = require("../controllers/Comment/putComment");

//routes
commentRouter.post("/:courseId", postComment);

commentRouter.get("/:courseId", getCommentsByCourse);

commentRouter.get("/:userId", getCommentsByUser);

commentRouter.get("/:id", getComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.put("/:id", putComment);

module.exports = commentRouter;
