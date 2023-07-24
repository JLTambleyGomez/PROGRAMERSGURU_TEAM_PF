const { Product, Category } = require("../../db");

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    if (!product) return res.status(400).json({ message: `No se ha encontrado el id ${id}` });

    const productWithCategory = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.Category ? product.Category.name : "No Listado", //
    };

    return res.status(200).json(productWithCategory);
  } catch (error) {
    return res.status(500).json({ message: "Algo malió sal" });
  }
};

module.exports = { getProductById };
        