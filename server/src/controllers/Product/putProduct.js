const { Product } = require("../../db");

const putProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            image,
            price,
            category
        } = req.body;

        const { id } = req.params;
        if(!name,
            !description,
            !image,
            !price,
            !category)
        return res.status(400).json({ message: "Error, debe ingresar datos a cambiar"});

        const productDB = await Product.findByPk(id);
        if(!productDB) {
            return res.status(404).json({message: "No existe un curso con ese id"})
        }
        for (let prop in req.body) {
            if (req.body[prop]) productDB[prop] = req.body[prop];
        }
        await productDB.save();

        const response = {
            productDB,
            message: "El producto fue modificado con éxito",
        };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {putProduct}