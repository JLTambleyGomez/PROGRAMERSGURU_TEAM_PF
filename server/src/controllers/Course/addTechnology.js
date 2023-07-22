const { Course, Technology } = require("../../db");

const addTechnology = async (req, res) => {
    try {
        const { id } = req.params;
        const { techIds } = req.body 
        // techIds es un array de id’s de las tecnologias que se quieren agregar al curso

        if (!id)
            return res
                .status(400)
                .json({ message: "No se reconoce la busqueda" });

        const course = await Course.findByPk(id)
        if (!techIds.length) return res.json({message: "No está agregando ninguna tecnología"})

        for (let i = 0 ; i < techIds.length ; i++) {
            const technology = await Technology.findByPk(techIds[i])
            await course.addTechnology(technology)
        }

        return res.status(200).json({message: "Se agregaron las tecnologias al curso"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addTechnology };