const { Comment, Course } = require("../../db");

const computeCourseRating = async (req, res) => {
    try {
        const { courseId } = req.params;

        const courseComments = await Comment.findAll({ where: { courseId } });

        if (!courseComments.length) {
            return res
                .status(404)
                .json({ message: "Este curso todavia no tiene puntuaciones" });
        }

        const initialValue = 0;
        const arrayOfRatings = courseComments.map((comment) => comment.rating);
        const meanRating =
            arrayOfRatings.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue
            ) / arrayOfRatings.length;
        
        const course = await Course.findByPk(courseId)
        course.meanRating = meanRating
        course.save()

        return res.json({ course, meanRating });
    } catch (error) {}
};

module.exports = { computeCourseRating };
