const { Course, Technology } = require("../../db");

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(400)
                .json({ message: "No se reconoce la busqueda" });

        // const courseDB = await Course.findByPk(id);
        const courseDB = await Course.findAll({
            where: {
                id
            },
            include: {
                model: Technology,
                through: {
                    attributes: []
                }
            }
        });

        if (!courseDB)
            return res
                .status(404)
                .json({ message: "No existe ese curso" });

        return res.status(200).json(courseDB);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCourseById };