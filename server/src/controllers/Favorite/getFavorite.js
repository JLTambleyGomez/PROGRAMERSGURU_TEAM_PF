const { Course, User } = require('../../db.js')

const getFavorite = async (req, res) => {
    try {
        const {userId} = req.params;

        if (userId === 0) {
            const allFavorites = await Favorite.findAll()
            return res.status(200).json(allFavorites)
        }
        console.log(userId);
        const allFavorites = await User.findOne({
            where: {
                id : userId
            },
            include: {
                model: Course,
                through: {
                    attributes: []
                }
            }
        })
        return res.status(200).json(allFavorites)

    } catch (error) {
        return res.status(500).json({message: 'Algo salió mal ' + error.message})
    }
}

module.exports = {getFavorite}