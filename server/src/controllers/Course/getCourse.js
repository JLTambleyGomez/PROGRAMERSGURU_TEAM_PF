const { Course } = require("../../db");
//___________________________________________________

const getCourse = async (req, res) => {
    try {
        const allCourses = await Course.findAll();

        if (!allCourses.length) {
            return res.status(404).json({message: "No hay cursos disponibles"})
        };
        return res.json(allCourses);

    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
}

module.exports = {getCourse};