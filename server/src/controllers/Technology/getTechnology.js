const { Technology } = require("../../db");

//Modifique la parte que envie un array de objetos con el id y el name de la categoria
const getTechnology = async (req, res) => {
    try {
        let technologies = await Technology.findAll();

        technologies = technologies.map((cat) => cat.dataValues);

        return res.json(technologies);

    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { getTechnology };