const { User, Course, Comment } = require("../../db");

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({
            where: {
                email
            },
            include: [
                {
                    model: Course,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: Course,
                            attributes: ["imageURL", "title"]
                        }                
                    ]
                }
            ]
        })
        // console.log(user);
        if (!user)
            return res.status(404).json({
                message: `No existe un usuario con el email ${email}`,
            });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error al obtener el usuario" + error.message });
    }
};

module.exports = { getUserByEmail };
