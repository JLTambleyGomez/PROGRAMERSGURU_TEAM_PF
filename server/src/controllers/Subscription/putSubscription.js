const { Subscription } = require("../../db");

const putSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, type, price } = req.body;

        if (!title && !description && !image && !type && !price)
            return res.status(500).json({
                message: `Debe ingresar todos los datos para poder modificar la suscripción`,
            });

        const suscription = await Subscription.findByPk(id);

        if (!suscription)
            return res.status(404).json({
                message: `No existe una suscripción con ese id ${id}`,
            });

        for (let prop in req.body) {
            if (req.body[prop]) suscription[prop] = req.body[prop];
        }

        await suscription.save();
        const response = {
            suscription,
            message: "La suscripción fue modificada con éxito",
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { putSubscription };
