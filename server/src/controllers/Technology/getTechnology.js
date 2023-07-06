const { Technology } = require("../../db");

const getTechnology = async (req, res) => {
    try {
        let technologies = await Technology.findAll();
        technologies = technologies.map((cat) => cat.dataValues.name);
        console.log(technologies);
        res.json(technologies);
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { getTechnology };
