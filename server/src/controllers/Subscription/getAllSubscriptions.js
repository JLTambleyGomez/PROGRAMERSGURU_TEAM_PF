const { Subscription } = require("../../db");

const getAllSubscriptions = async (req, res) => {
    try {
        const allSubscriptions = await Subscription.findAll();

        if (!allSubscriptions.length)
            return res.status(404).json({
                message: `No existen subscripciones en la base de datos`,
            });

        return res.status(200).json(allSubscriptions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllSubscriptions };
