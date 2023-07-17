const { getPayment } = require("../controllers/Payment/getPayment");
const {
    addProductToPayment,
} = require("../controllers/Payment/addProductToPayment");

const paymentRouter = require("express").Router();

paymentRouter.post("/", addProductToPayment);

paymentRouter.get("/:id", getPayment);

module.exports = paymentRouter;
