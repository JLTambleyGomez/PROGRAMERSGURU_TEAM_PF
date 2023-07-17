const { User, Comment } = require("../../db");

const getCommentsUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id }, include: Comment });

        console.log(user);
    } catch (error) {}
};

module.exports = { getCommentsUser };
