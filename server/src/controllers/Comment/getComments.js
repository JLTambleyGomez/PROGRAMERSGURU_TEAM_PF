const {Comment } = require("../../db")

const getComments = async (req, res) => {
    try {
        const allComments = await Comment.findAll()
        return res.json(allComments)
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal " + error.message})
    }
}

module.exports = {getComments}