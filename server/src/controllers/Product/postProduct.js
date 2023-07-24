const {Product, Category} = require("../../db.js")

const postProduct = async (req,res) => {
    try {
        const { name, price, description, image, stock, categoryId} = req.body;

        if(!price && !name && !description && !image && !categoryId && !stock) return res.status(400).json({message: "Debe ingresar los datos"})

        console.log(categoryId)

        const categoryDB = await Category.findByPk(categoryId)

        console.log(categoryDB.id)

        if(!categoryDB) return res.status(404).json({message: "No existe la categoria con ese id"})
      
        
        const newProduct = await Product.create({name,price,description,image,stock,categoryId:categoryDB.id})
        
        if(!newProduct) return res.status(400).json({message: "Surgió un error a la hora de crear el producto"})
     
        return res.status(200).json({message: "El producto fue creado con éxito"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {postProduct}