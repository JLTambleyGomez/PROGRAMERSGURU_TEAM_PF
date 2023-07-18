const { Product } = require('../db')
const { Op } = require("sequelize");


const get_products_by_name = async (name) => {

    try {
        const productsFound = await Product.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
            },
        });

        return productsFound;

    } catch (error) {

        return { message: error.message };
    }
}


module.exports = {
    get_products_by_name
}