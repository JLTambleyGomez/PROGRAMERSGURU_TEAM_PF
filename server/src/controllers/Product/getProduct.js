const {Product} = require('../../models/Product')

const getProduct = async (req, res) => {
    try {
        const allProducts = await Product.findAll()
        allProducts.length && res.json(allProducts)
        return res.status(404).json({message: "No se encontró ningún producto"})
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal"})
    }
}

module.exports = {getProduct}