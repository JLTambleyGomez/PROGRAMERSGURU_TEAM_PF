const { Comment } = require("../../db");
const getCommentsByUser = async (req, res) => {
    try {
        const {userId} = req.params
        const comments = await Comment.findAll({where: {userId}});

        if (!comments.length)
            return res
                .status(404)
                .json({ message: "Todavía no hiciste ningún comentario!" });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCommentsByUser };
