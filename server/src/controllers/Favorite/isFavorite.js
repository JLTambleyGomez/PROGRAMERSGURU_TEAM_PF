const { Favorite } = require('../../db.js')

const isFavorite = async (req, res) => {
    try {
        const {courseId, userId} = req.body;
        const isFavorite = await Favorite.findOne({
            where: {
                UserId: userId,
                CourseId: courseId
            }
        })
        if (isFavorite) return res.json({isFavorite: true})
        return res.json({isFavorite: false})

    } catch (error) {
        return res.status(500).json({message: 'Algo salió mal ' + error.message})
    }
}

module.exports = {isFavorite}