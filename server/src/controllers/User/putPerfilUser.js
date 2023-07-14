const { User } = require("../../db");

const putPerfilUser = async (req, res) => {
    const { name, picture, nickName,email } = req.body; 

    
    try {
     if(
        !name,
        !picture,
        !nickName,
        !email
     ) return res.status(400).json({ message: "Debe ingresar datos al cambiar"});

     const users= await User.findAll()
     console.log(users)

     const profile = await User.findOne({
        where: {
            email,
        }
     }) 
        if(!profile) return res.status(404).json({message: 'No existe un usuario con ese email'})

        for (let prop in req.body) {
            if (req.body[prop]) profile[prop] = req.body[prop];
        }

        await profile.save()
        const response = {
            profile,
            message: `Los datos del usuario ${name} fueron modificados con éxito`
        }

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = { putPerfilUser };



module.exports = { putPerfilUser };