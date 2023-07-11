const { Product } = require("../../db");

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const productId = await Product.findByPk(id);
        if(!id) return res.status(400).json({ message: `No se ha encontrado el id ${id}`});

        const product = {
          name: productId.name,
          price: productId.price,
          description: productId.description,
          image: productId.image,
          category: productId.category,
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal"});
    }
}

module.exports = { getProductById }

