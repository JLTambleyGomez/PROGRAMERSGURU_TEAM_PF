const { User } = require('../../db');

const GetUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los usuarios' + error.message });
  }
};

module.exports = { GetUsers };
