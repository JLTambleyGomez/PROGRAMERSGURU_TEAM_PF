const { Product } = require('../../db.js')
const { Op } = require("sequelize");
const { get_products_by_name } = require("../../handlers/productHandlers.js")


const getProductByName = async (req, res) => {

    const { name } = req.params

    try {
        const productsFound = await get_products_by_name(name)

        if (productsFound.length === 0) res.status(404).json({ message: "No se encontraron coincidencias" });

        else return res.json(productsFound);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
}

module.exports = {getProductByName};