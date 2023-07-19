const { Favorite } = require("../../db");

const deleteFavorite = async (req, res) => {
    try {
        const {courseId, userId} = req.body;
        console.log(courseId, userId);
        const favorite = await Favorite.findOne({
            where: {
                CourseId: courseId,
                UserId: userId
            }
        });
        await favorite.destroy();
        return res
            .status(201)
            .json({ message: `El curso fue eliminado correctamente de favoritos ` });
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal. " + error.message});
    }
}

module.exports = { deleteFavorite };