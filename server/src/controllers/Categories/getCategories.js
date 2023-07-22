const {Category}= require("../../db");

const getCategories= async(req,res)=>{
try {
    const allCategories = await Category.findAll();
    
    if(!allCategories.length) return res.status(404).json({message: "No se encontraron categorias"})
 
    return res.status(200).json({allCategories})

} catch (error) {
    res.status(500).json({message: "Algo falló"})
}
}

module.exports={getCategories};