//Router
const categoryRouter = require("express").Router();

//controller
const { getCategory } = require("../controllers/Category/getCategory");
const { deleteCategory } = require('../controllers/Category/deleteCategory')
const { postCategory } = require("../controllers/Category/postCategory");

categoryRouter.get('/', getCategory);

categoryRouter.post('/', postCategory)

categoryRouter.delete('/:id', deleteCategory)



module.exports= categoryRouter