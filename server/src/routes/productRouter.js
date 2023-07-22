//Router
const productRouter = require("express").Router();

//controllers
const { getProduct } = require("../controllers/Product/getProduct");
const { postProduct } = require("../controllers/Product/postProduct");
const { deleteProduct } = require("../controllers/Product/deleteProduct");
const { putProduct } = require("../controllers/Product/putProduct");
const { postProducts } = require("../controllers/Product/postProducts");
const { getProductById } = require("../controllers/Product/getProductById");
const { getProductsByName } = require("../controllers/Product/getProductsByName");


productRouter.post("/all", postProducts);

productRouter.get("/", getProduct);


productRouter.post("/", postProduct);

productRouter.delete("/:id", deleteProduct);

productRouter.get("/:id", getProductById);

productRouter.put("/:id", putProduct);

productRouter.get("/name/:name", getProductsByName); // localhost:3001/product/name/impresora


module.exports = productRouter;