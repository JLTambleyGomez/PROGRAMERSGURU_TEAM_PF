const { Payment, Product, User } = require("../../db");

const getAllPayments = async (req, res) => {
    try {
      
        const allPayments = await Payment.findAll({
            attributes: ["date", "status", "totalPrice", "id"],
            include: [
                {
                    model: User,
                    attributes: ["name", "email"],
                },
            ],
        });


        if (!allPayments.length)
            return res.status(404).json({ message: "No existen pagos" });

        return res.status(200).json(allPayments);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message + "me fui directo al catch" });
    }
};

module.exports = { getAllPayments };
