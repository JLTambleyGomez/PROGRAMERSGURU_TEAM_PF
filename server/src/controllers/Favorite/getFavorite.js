const { Course, Favorite } = require('../../db.js')

const getFavorite = async (req, res) => {
    try {
        const {idUser} = req.params;
        const allFavorites = await Favorite.findAll({where: {UserId : idUser}})
        let favorites = []

        for (let i = 0; i < allFavorites.length; i++) {
            const course = await Course.findByPk(allFavorites[i].dataValues.CourseId)
            favorites.push(course)
        }
        
        if (!favorites.length) return res.status(404).json({message: "El usuario no posee ningún favorito"})
        return res.status(200).json(favorites)

    } catch (error) {
        return res.status(500).json({message: 'Algo salió mal ' + error.message})
    }
}

module.exports = {getFavorite}