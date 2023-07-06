//Router
const categoryRouter = require("express").Router();

//controller
const { getTechnology } = require("../controllers/Technology/getTechnology");
const { deleteTechnology } = require('../controllers/Technology/deleteTechnology')
const { postTechnology } = require("../controllers/Technology/postTechnology");

categoryRouter.get('/', getTechnology);

categoryRouter.post('/', postTechnology)

categoryRouter.delete('/:id', deleteTechnology)



module.exports= categoryRouter