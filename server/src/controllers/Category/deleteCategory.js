const { Category } = require("../../db")
//__________________________________________________

const deleteCategory = async (req,res) => {
    try {
        
        const { id } = req.params
        console.log(id);
        const deletedCategory = await Category.findByPk(id)
        console.log(deletedCategory);
        if (!deletedCategory) return res.status(404).json({message:`La categoria con el id '${id}' no existe`})

        const name = deletedCategory.name

        deletedCategory.destroy()

        return res.status(200).json({message:`La categoria '${name}' fue borrada con éxito`}) 

    } catch (error) {

        return res.status(500).json({message:error.message})
    }
}

module.exports = {deleteCategory};