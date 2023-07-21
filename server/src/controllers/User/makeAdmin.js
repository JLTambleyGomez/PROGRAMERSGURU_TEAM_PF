const { User } = require("../../db");

const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user.admin)
            return res.json({ message: "El usuario ya es administrador" });
        user.admin ? (user.admin = true) : (user.admin = true);
        await user.save();
        return res
            .status(200)
            .json({
                message: user.admin
                    ? "El usuario ahora es administrador"
                    : "El usuario ya no es administrador",
            });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { makeAdmin };
