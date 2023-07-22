const { Comment } = require("../../db");

const postComment = async (req, res) => {
    try {
        const { courseId } = req.params;

        const { message, date, rating, userId } = req.body;

        if (!message || !date || !rating || !userId)
            return res.status(400).json({ message: "Faltan datos" });

        const existingComment = await Comment.findOne({
            where: { userId, courseId },
        });
        if (existingComment)
            return res
                .status(400)
                .json({ message: "Ya hiciste un comentario en este curso" });

        const newComment = await Comment.create({
            message,
            date,
            rating,
            userId,
            courseId
        });

        if (!newComment)
            return res
                .status(500)
                .json({ message: `Surgio un error al crear el comentario` });

        return res.status(200).json({message: "Se publicó tu comentario", comment: newComment});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { postComment };
