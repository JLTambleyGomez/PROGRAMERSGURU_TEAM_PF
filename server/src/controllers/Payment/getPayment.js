const { Payment, Product } = require("../../db");

const getPayment = async (req, res) => {
    try {
        const { id } = req.params;
        if (id==="0") {
            const allPayments = await Payment.findAll({include: [{model: Product}]}) 
            return res.json(allPayments)
        }
        const payment = await Payment.findByPk(id, {include: [{model: Product}]});
        
        if (!payment)
            return res
                .status(404)
                .json({ message: "No se ha encontrado el pago " });

        return res.status(200).json(payment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getPayment };
