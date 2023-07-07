<<<<<<< HEAD
const { Course, Category } = require("../../db")
const {Op} = require("sequelize")

const getCourseByName = async (req, res) => {
    const {title}= req.query
    console.log()
    console.log(``)
    try {
        const allCourses = await Course.findAll({where: {
            title:{[Op.iLike]: `%${title}%`}}
    });

        if (!allCourses.length) {
            return res.status(404).json({message: "No hay cursos disponibles"})
        };
        return res.json(allCourses);

    } catch (error) {
        return res.status(500).json({message: "Algo salió mal"});
    }
}

module.exports = {getCourseByName};
=======
const { Course, Technology } = require("../../db");
const { Op } = require("sequelize");

const getCourseByName = async (req, res) => {
    const { title } = req.query;

    try {
        const allCourses = await Course.findAll({
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${title}%`,
                },
            },
        });

        if (allCourses.length === 0) {
            return res
                .status(404)
                .json({ message: "No hay cursos disponibles" });
        }

        return res.json(allCourses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { getCourseByName };
>>>>>>> 0872d5bb8092e6d5d2ca6e443da9719a5724e266
