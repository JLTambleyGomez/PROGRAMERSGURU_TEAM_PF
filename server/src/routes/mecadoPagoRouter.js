const mercadoPagoRouter = require("express").Router();
const { createOrder } = require("../controllers/pasarela de pagos/createOrder");
const {
    recieveWebhook,
} = require("../controllers/pasarela de pagos/receiveWebhook");

mercadoPagoRouter.post("/create-order", createOrder);

mercadoPagoRouter.get("/success", (req, res) => {
    return res.send("success");
});
mercadoPagoRouter.get("/failure", (req, res) => {
    return res.send("failure");
});
mercadoPagoRouter.get("pending", (req, res) => {
    return res.send("pending");
});
mercadoPagoRouter.post("/webhook", recieveWebhook);

module.exports = mercadoPagoRouter;
