const {User} = require("../../db");

const makeAdmin = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({where: {email}})
        
        user.admin 
        ? user.admin = false
        : user.admin = true
        await user.save()
        return res.json({message: user.admin ? "El usuario ahora es administrador" : "El usuario ya no es administrador"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {makeAdmin}