const {Product} = require("../../db.js")

const postProduct = async (req,res) => {
    try {
        const {price, name, description, image, category} = req.body;
        const [newProduct, created] = await Product.findOrCreate({
            where:{
                name
            },
            defaults: {
                price,
                description,
                image,
                category,
            }
        })

        const response = {
            product: {
                name: "",
                image: "",
                description: "",
                price: "",
            },
            successResponse: created
            ? "El producto fue creado exitosamente"
            : `Ya existe un producto con el nombre ${newProduct.name}. Pruebe con un nombre diferente`,
            created,
        };

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({message: "Algo salió mal. Comprobar tipos de datos ingresados"})
    }
}

module.exports = {postProduct}