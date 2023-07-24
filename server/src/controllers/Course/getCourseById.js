const { Course, Technology, Comment, User, Favorite } = require("../../db");

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["name", "picture"], 
                        },
                    ],
                },
                {
                    model: Technology,
                    through: {
                        attributes: [],
                    },
                    attributes:["id","name"],
                },
                {
                    model: User,
                    attributes: ["id"],
                    through: {
                        attributes: [],
                    }
                }
            ],
        });

        if (!course)
            return res.status(404).json({ message: "No existe ese curso" });

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getCourseById };