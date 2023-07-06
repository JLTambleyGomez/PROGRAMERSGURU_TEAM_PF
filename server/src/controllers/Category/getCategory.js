const {Category} = require('../../db')

const getCategory = async (req, res) => {
    try {
        
        let categories = await Category.findAll()
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: 'Algo salió mal'})
    }
}



module.exports = {getCategory}