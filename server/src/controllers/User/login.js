const { User } = require('../../db');
//__________________________________________________

const Login = async (req, res) => {

    const { email, password } = req.query;
  
    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {

        const user = await User.findOne({ where: { email } });
    
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (user.password !== password) {
            return res.status(403).json({ message: 'Contraseña incorrecta' });
        }
        return res.json({ access: true });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
  
module.exports = { Login };