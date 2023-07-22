const { User, Course } = require("../../db");

const deleteFavorite = async (req, res) => {
    try {
        const {courseId, userId} = req.body;
        console.log(courseId, userId);

        const user = await User.findByPk(Number(userId))
        const course = await Course.findByPk(Number(courseId))

        await user.removeCourse(course)

        console.log('El curso fue eliminado de favoritos');
        return res
            .status(201)
            .json({ message: 'El curso fue eliminado de favoritos' });
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal. " + error.message});
    }
}

module.exports = { deleteFavorite };