const { Category, Product } = require("../../db");

const postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(404).json({ message: "Debe ingresar un nombre" });

        const [newCategory, created] = await Category.findOrCreate({ where: { name } });

        if (!newCategory) return res.status(400).json({ message: "Surgió un error al crear la categoria" });

        return res.status(200).json({ message: `La categoria con el nombre ${name} fue creada con éxito` });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { postCategory };
