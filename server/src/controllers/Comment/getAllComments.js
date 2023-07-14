const { Comment } = require("../../db");
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();

        if (!comments.length)
            return res
                .status(404)
                .json({ message: `No se encontraron comentarios en la db` });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllComments };
