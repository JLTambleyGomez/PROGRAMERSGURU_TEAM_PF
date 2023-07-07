const { Technology } = require("../../db");

const deleteTechnology = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTechnology = await Technology.findByPk(id);
        if (!deletedTechnology)
            return res
                .status(404)
                .json({ message: `La categoria con el id '${id}' no existe` });

        const name = deletedTechnology.name;

        deletedTechnology.destroy();

        return res
            .status(200)
            .json({ message: `La categoria '${name}' fue borrada con éxito` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { deleteTechnology };