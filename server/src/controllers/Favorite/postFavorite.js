const {Course, User} = require('../../db');

const postFavorite = async (req, res) => {
    
    try {
        const {courseId, userId} = req.body;
        console.log(courseId, userId);
        
        const newFavorite = await Course.findByPk(courseId)
        const user = await User.findByPk(userId)
        await user.addCourse(newFavorite);
        console.log("Se agregó correctamente el favorito");
        return res.status(200).json({message: "Se agregó correctamente el favorito"}); 
    } catch (error) {
        return res.status(500).send({message: "Algo salió mal. " + error.message})
    }
};

module.exports = {postFavorite}