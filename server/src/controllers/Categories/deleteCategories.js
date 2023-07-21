const { Category } = require("../../db");

const deleteCategory = async (req,res) => {
    try {
        const { id } = req.params

        const deleted = await Category.findByPk(id)

        if(!deleted) return res.status(404).json({message: "No se encontro una categoria con ese id"})

        await deleted.destroy()

        return res.status(200).json({message: "La categoria fue borrada con éxito"}) 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {deleteCategory}