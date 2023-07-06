const {Course} = require("../../db");
//__________________________________________________

const deleteCourse = async (req, res) => {
    try {
        const { courseToDelete } = req.body;
        await Course.destroy({where: {courseToDelete}});
        res.status(200).json({message: "Se eliminó el curso correctamente"});

    } catch (error) {
        res.status(500).json({message: "Algo salió mal"});
    }
}

module.exports = {deleteCourse};