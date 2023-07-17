const { Product } = require('../../db.js')
const { Op } = require("sequelize");

//FUNCIONA MAL, DEVUELVE TODOS LOS PRODUCTOS A PESAR DEL OPERADOR.
const getProductByName = async (req, res) => {

    const { name } = req.query

    try {
        const productsFound = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        if (productsFound.length === 0) {
            return res.status(404).json({message: "No se encontraron coincidencias"})
        } else {
            return res.status(200).json(productsFound)
        }

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = getProductByName;