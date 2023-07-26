const { Payment } = require("../../db");

const deletePaymentOfUser = async (req, res) => {
    try {
        const { userId, paymentId } = req.body;
        const paymentToRemove = await Payment.findOne({
            where: {
                id: paymentId,
                userId: userId,
            },
        });
        await paymentToRemove.destroy()

        return res.json({message: `El resumen de pago con id n° ${paymentId} se borró correctamente`})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { deletePaymentOfUser }
