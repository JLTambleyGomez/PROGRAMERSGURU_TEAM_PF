const {Course, User} = require('../../db');

const postFavorite = async (req, res) => {
    
    try {
        // const {id, title, description, courseURL, imageURL, meanRating, released, isFree, language} = req.body;
        const {idCourse, idUser} = req.body;
        
        const newFavorite = await Course.findByPk({where: {idCourse}})
        const user = await User.findByPk({where: {idUser}})
        
        await newFavorite.addUser(user);

        return res.status(200).json({message: "Se agregó correctamente el favorito"}); 
    } catch (error) {
        return res.status(500).send({message: "Algo salió mal." + error.message})
    }
};

module.exports = {postFavorite}