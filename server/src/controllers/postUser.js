const {User} = require('../db.js');
 

  
const PostUser = async(req,res)=>{
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Faltan datos');
      }
   // Buscamos el usuario en la base de datos
   const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { id: 1, email, password },
  });
  

  // Si el usuario ya existía en la base de datos, devolvemos un mensaje de error
  if (!created) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Devolvemos el usuario creado
  return res.status(201).json(user);
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Error al crear el usuario' });
}
};

module.exports = { PostUser };
    
