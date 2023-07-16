const { Subscription } = require("../../db");

const postSubscription = async (req, res) => {
    try {
        const { title, description, image, type } = req.body;

        if (!title && !description && !image && !type)
            return res.status(500).json({
                message: `Debe ingresar todos los datos para poder crear la suscripción`,
            });

        const suscription = await Subscription.findOrCreate({
            where: {
                title,
            },
            defaults: { description, image, type },
        });

        if (!suscription)
            return res
                .status(404)
                .json({ message: "Surgió un error al crear la suscripción " });

        return res.status(200).json({
            message: `La suscripción con el nombre ${title} fue creada con éxito`,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { postSubscription };
