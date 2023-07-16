const { User } = require('../../db');

const getUserByEmail = async (req, res) => {
    const {email} = req.query;
    try {
      const user = await User.findOne({where:{email}});
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener el usuario' + error.message });
    }
  };
  
  module.exports = { getUserByEmail };
  