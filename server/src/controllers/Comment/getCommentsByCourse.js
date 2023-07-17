const { Comment } = require("../../db");
const getCommentsByCourse = async (req, res) => {
    try {
        const {courseId} = req.params
        const comments = await Comment.findAll({where: {courseId}});

        if (!comments.length)
            return res
                .status(404)
                .json({ message: "Este curso no tiene comentarios todavía. Sé el primero en comentar!" });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCommentsByCourse };
