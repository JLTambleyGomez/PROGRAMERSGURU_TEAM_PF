const { Comment } = require("../../db");

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment)
            return res
                .status(404)
                .json({ message: `No existe un comment con el id: ${id}` });

        await comment.destroy();
        return res.status(200).json({
            message: "El comentario fue borrado con éxito",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { deleteComment };
