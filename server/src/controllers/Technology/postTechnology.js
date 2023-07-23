const { Technology  } = require("../../db");

const postTechnology = async (req, res) => {
    try {
        const { technology } = req.body;
        const [newTechnology, created] = await Technology.findOrCreate({
            where: {
                name: technology,
            },
        });

        const response = {
            technology: "",
            message: created
                ? `La nueva tecnología '${newTechnology.name}' fue creada exitosamente`
                : `Ya existe una tecnología con el nombre '${newTechnology.name}'`,
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Algo salió mal " + error.message });
    }
};

module.exports = { postTechnology };