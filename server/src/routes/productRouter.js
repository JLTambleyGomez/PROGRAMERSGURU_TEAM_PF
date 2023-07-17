//Router
const productRouter = require("express").Router();

//controllers
const { getProduct } = require("../controllers/Product/getProduct");
const { postProduct } = require("../controllers/Product/postProduct");
const { deleteProduct } = require("../controllers/Product/deleteProduct");
const { putProduct } = require("../controllers/Product/putProduct");
const { postProducts } = require("../controllers/Product/postProducts");
const { getProductById } = require("../controllers/Product/getProductById");

productRouter.get("/", getProduct);

productRouter.get("/all", postProducts);

productRouter.post("/", postProduct);

productRouter.delete("/:id", deleteProduct);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", putProduct);


module.exports = productRouter;