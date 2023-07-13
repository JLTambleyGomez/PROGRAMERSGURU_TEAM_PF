const { User } = require('../../db');

const GetUserByEmail = async (req, res) => {
    const {email} = req.body;
    try {
      const user = await User.findOne({where:{email}});
  
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener los usuarios' + error.message });
    }
  };
  
  module.exports = { GetUserByEmail };
  