const { User } = require('../../db');

const getUser = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users)
    if(!users) { 
      return res.status(404).json({ message: "No existe ese usuario" })
    } 
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los usuarios' + error.message });
  }
};

module.exports = { getUser };
