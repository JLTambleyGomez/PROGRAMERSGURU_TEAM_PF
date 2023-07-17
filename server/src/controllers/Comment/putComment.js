const { Comment } = require("../../db.js");

const putComment = async (req, res) => {
    try {
        const { id } = req.params;

        const { message, date, rating, userId } = req.body;
        if (!message && !date && !rating)
            return res.status(404).json({ message: "Faltan datos" });

        const existingComment = await Comment.findByPk(id);
        if (!existingComment)
            return res.status(400).json({
                message:
                    "No existe un comentario en este curso de este usuario",
            });

        if (existingComment.userId !== userId)
            return res.status(403).json({
                message: "No tiene permisos de editar este comentario",
            });

        for (let prop in req.body) {
            if (req.body[prop]) existingComment[prop] = req.body[prop];
        }

        await existingComment.save();

        return res.status(200).json(existingComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = { putComment };
