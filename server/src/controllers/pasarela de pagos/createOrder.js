const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
    try {
        mercadopago.configure({
            access_token:
                "TEST-7366931760156988-071417-9f721ac6bad881e7546f0df180920193-1423375235",
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
                success: "https://programmers-guru-db5b4f75594d.herokuapp.com//mercadoPago/success",
                failure: "https://programmers-guru-db5b4f75594d.herokuapp.com//mercadoPago/failure",
                pending: "https://programmers-guru-db5b4f75594d.herokuapp.com//mercadoPago/pending",
            },
            notification_url: "7510-179-6-215-95.ngrok.io/webhook",
        }); //7510-179-6-215-95.ngrok.io

        console.log(result);

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
