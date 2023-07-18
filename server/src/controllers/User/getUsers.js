const { User } = require('../../db');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if(!users.length) { 
      return res.status(404).json({ message: "No existe ese usuario" })
    } 
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los usuarios' + error.message });
  }
};

module.exports = { getUsers };
