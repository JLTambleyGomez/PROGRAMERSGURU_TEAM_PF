const { Course } = require("../../db");
//__________________________________________________

const deleteCourse = async (req, res) => {
    try {
        const { courseToDelete } = req.body;
        await Course.destroy({ where: { courseToDelete } });
        return res
            .status(200)
            .json({ message: "Se eliminó el curso correctamente" });

        // await Course.destroy({where: {}})
        // res.status(200).json({message: "Se eliminó el curso correctamente"})
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

module.exports = { deleteCourse };

module.exports = { deleteCourse };
