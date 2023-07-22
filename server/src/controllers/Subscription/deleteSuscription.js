const { Subscription } = require("../../db");

const deleteSuscription = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Subscription.destroy({ where: { id } });

        if (deleted) {
            return res
            .status(200)
            .json({ message: "la suscripción fue borrada con éxito" });

            
        } else {
            return res
                .status(404)
                .json({ message: "No se encontró ninguna suscripción" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { deleteSuscription };
