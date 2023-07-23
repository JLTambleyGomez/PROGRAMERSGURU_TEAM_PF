const { postCategory } = require("../controllers/Categories/postCategories")
const { getCategories } = require("../controllers/Categories/getCategories");
const { deleteCategory } = require("../controllers/Categories/deleteCategories");
//Router
const categoryRouter = require("express").Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", postCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;

