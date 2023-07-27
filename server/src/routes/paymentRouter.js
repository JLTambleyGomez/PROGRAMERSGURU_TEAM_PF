const { getPayment } = require("../controllers/Payment/getPayment");
const {
    addProductToPayment,
} = require("../controllers/Payment/addProductToPayment");
const { deletePaymentOfUser } = require("../controllers/Payment/deletePaymentOfUser");
const { getAllPayments } = require("../controllers/Payment/getAllPayments");

const paymentRouter = require("express").Router();

paymentRouter.post("/", addProductToPayment);

paymentRouter.get("/:id", getPayment);

paymentRouter.delete("/", deletePaymentOfUser)

paymentRouter.get("/pagos/all", getAllPayments)

module.exports = paymentRouter;
