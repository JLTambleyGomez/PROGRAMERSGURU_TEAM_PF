//Router
const commentRouter = require("express").Router();

//controllers
const { deleteComment } = require("../controllers/Comment/deleteComment");
const { getCommentsByUser } = require("../controllers/Comment/getCommentsByUser");
const { getCommentsByCourse } = require("../controllers/Comment/getCommentsByCourse");
const { postComment } = require("../controllers/Comment/postComment");
const { putComment } = require("../controllers/Comment/putComment");
const { computeCourseRating } = require("../controllers/Comment/computeCourseRating");
const { getComments } = require("../controllers/Comment/getComments");

//routes
commentRouter.get("/", getComments)

commentRouter.get("/user/:userId", getCommentsByUser);//////////// no se usan mas

commentRouter.get("/course/:courseId", getCommentsByCourse);//////////// no se usan mas

commentRouter.post("/:courseId", postComment);

commentRouter.delete("/:id", deleteComment);

commentRouter.put("/:id", putComment);

commentRouter.put("/course/:courseId", computeCourseRating);

module.exports = commentRouter;
