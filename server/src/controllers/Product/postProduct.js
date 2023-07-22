const {Product, Category} = require("../../db.js")

const postProduct = async (req,res) => {
    try {
        const { name, price, description, image, stock, categoryId} = req.body;

        if(!price && !name && !description && !image && !categoryId && !stock) return res.status(400).json({message: "Debe ingresar los datos"})

        const categoryDB = await Category.findByPk(categoryId)

        if(!categoryDB) return res.status(404).json({message: "No existe la categoria con ese id"})
        
        const [newProduct, created] = await Product.findOrCreate({
            where:{
                name,
            },
            defaults: {
                price,
                description,
                image,
                stock,
                categoryId: categoryDB.id
                
            }
        })
        if(!newProduct) return res.status(400).json({message: "Surgió un error a la hora de crear el producto"})

        
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
        return res.status(500).json({message: error.message})
    }
}

module.exports = {postProduct}