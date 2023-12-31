const { Course, Technology } = require("../../db");

const putCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            imageURL,
            courseURL,
            rating,
            released,
            isFree,
            language,
            tecnology
        } = req.body;

        const { id } = req.params;

        if (
            !title &&
            !description &&
            !imageURL &&
            !courseURL &&
            !rating &&
            !released &&
            !isFree &&
            !language &&
            !tecnology.length
        )
            return res
                .status(400)
                .json({ message: "Error debe ingresar datos a cambiar" });

        const courseDB = await Course.findByPk(id);

        if (!courseDB)
            return res
                .status(404)
                .json({ message: "No existe un curso con ese id" });

        if(tecnology.length) {
            for (let i = 0; i < tecnology.length; i++) {
                const newCourseTechnology = await Technology.findByPk(
                    tecnology[i]
                );
                await courseDB.addTechnology(newCourseTechnology);
            }
        }


        for (let prop in req.body) {
            if (req.body[prop] && req.body[prop]!=="tecnology") courseDB[prop] = req.body[prop];
        }

        await courseDB.save();

        const response = {
            courseDB,
            message: "El curso fue modificado con éxito",
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { putCourse };
