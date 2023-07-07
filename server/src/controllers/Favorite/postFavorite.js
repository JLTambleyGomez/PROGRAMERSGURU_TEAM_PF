const {Course, User} = require('../../db');

const postFavorite = async (req, res) => {
    
    try {
        const {idCourse, idUser} = req.body;
        
        const newFavorite = await Course.findByPk(idCourse)
        const user = await User.findByPk(idUser)
        await user.addCourse(newFavorite);

        return res.status(200).json({message: "Se agregó correctamente el favorito"}); 
    } catch (error) {
        return res.status(500).send({message: "Algo salió mal." + error.message})
    }
};

module.exports = {postFavorite}