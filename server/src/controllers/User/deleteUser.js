const { User } = require("../../db");


const deleteUser = async (req, res) => {

    try {
        const { id } = req.body;

        console.log("userdelete")
        console.log(id);

        const deletedUser = await User.findByPk(id.id);
        if (!deletedUser)
            return res
                .status(404)
                .json({ message: `El usuario con el id '${id.id}' no existe` });

        const name = deletedUser.name;

        console.log("intento")
        console.log(deletedUser);

        await deletedUser.destroy();

        return res
            .status(200)
            .json({ message: `El usuario '${name}' con id ${id.id} fue borrado con éxito` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { deleteUser }