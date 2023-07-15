const mercadopago = require("mercadopago");

const recieveWebhook = async (req, res) => {
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
            const response = await mercadopago.paymentfindByPk(
                payment["data.id"]
            );
            console.log(req.query);
            console.log(response);
            console.log(payment);
            return res.status(200);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { recieveWebhook };
