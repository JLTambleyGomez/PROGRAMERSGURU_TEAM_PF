const { Course, Technology } = require("../../db");

const removeTechnology = async (req, res) => {
    try {
        const { id } = req.params;
        const { techIds } = req.body 
        // techIds es un array de id’s de las tecnologias que se quieren borrar del curso

        if (!id)
            return res
                .status(400)
                .json({ message: "No se reconoce la busqueda" });

        const course = await Course.findByPk(id)
        if (!techIds.length) return res.json({message: "No está borrando ninguna tecnología"})

        for (let i = 0 ; i < techIds.length ; i++) {
            const technology = await Technology.findByPk(techIds[i])
            await course.removeTechnology(technology)
        }

        return res.status(200).json({message: "Se quitaron las tecnologias al curso"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { removeTechnology };