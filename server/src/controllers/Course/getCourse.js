const { Course } = require("../../db")

//___________________________________________________
const getCourse = async (req, res) => {
    try {
        const allCourses = await Course.findAll()
        
        if (!allCourses.length) {
            res.status(404).json({message: "No hay cursos disponibles"})
        }
        res.json(allCourses)
    } catch (error) {
        res.status(500).json({message: "Algo salió mal"})
    }
}

module.exports = {getCourse}