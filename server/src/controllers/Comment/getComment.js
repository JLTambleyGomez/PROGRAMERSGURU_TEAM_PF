const { Comment } = require("../../db");

const getComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);

        if (!comment)
            return res.status(404).json({
                message: `El comentario con de id: ${id} no fue encontrado`,
            });

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getComment };
