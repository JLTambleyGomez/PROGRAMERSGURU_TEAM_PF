const { Subscription } = require("../../db");

const deleteSuscription = async (req, res) => {
    try {
        const { id } = req.params;

        const suscription = await Subscription.findByPk(id);

        if (!suscription)
            return res
                .status(404)
                .json({ message: `La suscripción con el id ${id} no existe` });

        suscription.destroy();
        return res.status(200).json(suscription);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { deleteSuscription };
