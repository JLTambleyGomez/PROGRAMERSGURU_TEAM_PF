const { Technology } = require("../../db");

const putTechnology = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const technologyDB = await Technology.findByPk(id);
        if (!technologyDB)
            return res
                .status(404)
                .json({ message: `La categoria con el id: ${id} no existe` });

        const existingTechnology = await Technology.findOne({
            where: { name },
        });
        if (existingTechnology)
            return res
                .status(400)
                .json({ message: "Ya existe una tecnología con ese nombre" });

        technologyDB.dataValues.name = name;
        await technologyDB.save();

        const response = {
            technologyDB,
            message: "La categoria fue modificada con éxito",
        };

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { putTechnology };
