const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
    try {
        mercadopago.configure({
            access_token:
                "TEST-8277578497653004-071418-3f9e23a6d3437d2b53e3b14fb0089cf3-1423373513",
        });

        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "Laptop Dell",
                    unit_price: 200,
                    currency_id: "ARS",
                    quantity: 2,
                },
            ],
            back_urls: {
                success: "http://localhost:3001/mercadoPago/success",
                failure: "http://localhost:3001/mercadoPago/failure",
                pending: "http://localhost:3001/mercadoPago/pending",
            },
            notification_url: "7510-179-6-215-95.ngrok.io/webhook",
        }); //7510-179-6-215-95.ngrok.io

        console.log(result.data);

        // mandar el link para pagar el producto, cambiar luego para el front.
        // return res.status(200).result["init_point"];
        return res.json({
            message: "Creando orden",
            result: result.body,
            id: result.data.id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = { createOrder };
