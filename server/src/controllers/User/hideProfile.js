const { User } = require("../../db");

const hideProfile = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        const user = await User.findOne({ where: { email } });

        user.banned ? (user.banned = false) : (user.banned = true);
        await user.save();
        return res.json({
            message: user.banned
                ? "El usuario fue desactivado"
                : "El usuario está activo",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { hideProfile };
