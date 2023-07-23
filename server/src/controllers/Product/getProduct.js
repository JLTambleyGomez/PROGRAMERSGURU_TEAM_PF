const {Product, Category} = require("../../db.js")

const getProduct = async (req, res) => {
    try {
        const allProducts = await Product.findAll({include:{model: Category, attributes: ['name']}})

        if (allProducts.length) return res.json(allProducts)

        return res.status(404).json({message: "No se encontró ningún producto"})
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal " + error})
    }
}

module.exports = {getProduct}