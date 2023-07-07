const { Course } = require("../../db");
//__________________________________________________

const deleteCourse = async (req, res) => {
    try {

        const { id } = req.params;

        const courseId = await Course.findByPk(id);

        if (!courseId) {
            return res
                .status(404)
                .json({ message: `El curso con el id ${id} no existe` });
        }

        const name = courseId.title;
        await courseId.destroy();
        return res
            .status(201)
            .json({ message: `El curso ${name} fue eliminado exitosamente ` });

    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
}

module.exports = {deleteCourse};

