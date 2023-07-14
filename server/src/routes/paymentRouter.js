const { getPayment } = require("../controllers/Payment/getPayment");
const {
    addProductToPayment,
} = require("../controllers/Payment/addProductToPayment");

const paymentRouter = require("express").Router();

paymentRouter.get("/:id", getPayment);

paymentRouter.post("/", addProductToPayment);

module.exports = paymentRouter;
