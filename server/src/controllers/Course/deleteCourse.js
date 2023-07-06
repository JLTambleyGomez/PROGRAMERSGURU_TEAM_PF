const {Course} = require("../../db");
//__________________________________________________

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCourse = await Course.findByPk(id)
        if (!deletedCourse) return res.status(404).json({message:`La curso con el id '${id}' no existe`})
        const name = deletedCourse.title

      await deletedCourse.destroy();
      return res.status(200).json({message:`El curso '${name}' fue borrado con éxito`}) 

    } catch (error) {
        return res.status(500).json({message: "Algo salió mal"});
    }
}

module.exports = {deleteCourse};

