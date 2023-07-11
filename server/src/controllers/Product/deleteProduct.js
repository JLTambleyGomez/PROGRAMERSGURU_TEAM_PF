const {Product} = require('../../db.js')

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Product.destroy({where: {id}})
        if (deleted) return res.json({message: "El producto fue borrado correctamente"})
        return res.status(404).json({message: "No se encontró ningún producto"})
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal"})
    }
}

module.exports = {deleteProduct}