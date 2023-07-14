const { User, Comment, Course } = require("../../db");

const postComment = async (req, res) => {
    try {
        const { courseId } = req.params; //2

        const { message, date, rating, userId } = req.body;

        if (!message && !date && !rating && !userId)
            return res.status(404).json({ message: "Faltan datos" });

        const existingComment = await Comment.findOne({
            where: { userId, courseId },
        });
        if (existingComment)
            return res
                .status(400)
                .json({ message: "Ya hiciste un comentario en este curso" });

        //traer el curso
        const course = await Course.findByPk(courseId);
        if (!course)
            return res.status(404).json({
                message: `No se encontro un curso con este id: ${courseId}`,
            });

        //traer el usuario
        const user = await User.findByPk(userId); //3
        if (!user)
            return res.status(404).json({
                message: `No se encontro un usuario con este id: ${id}`,
            });

        const newComment = await Comment.create({
            message,
            date,
            rating,
            userId: user.id,
            courseId: course.id,
        });

        if (!newComment)
            return res
                .status(500)
                .json({ message: `Surgio un error al crear el comentario` });

        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { postComment };
