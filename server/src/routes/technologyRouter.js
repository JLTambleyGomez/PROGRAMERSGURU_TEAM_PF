//Router
const technologyRouter = require("express").Router();

//controller
const { getTechnology } = require("../controllers/Technology/getTechnology");
const { deleteTechnology } = require("../controllers/Technology/deleteTechnology");
const { postTechnology } = require("../controllers/Technology/postTechnology");
const { putTechnology } = require("../controllers/Technology/putTechnology");

technologyRouter.get("/", getTechnology);

technologyRouter.post("/", postTechnology);

technologyRouter.delete("/:id", deleteTechnology);

technologyRouter.put("/:id", putTechnology);

module.exports = technologyRouter;