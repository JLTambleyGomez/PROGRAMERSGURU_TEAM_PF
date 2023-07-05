const {Categories} = require('../db')

const getCategories = async (req, res) => {
    try {
        
        let categories = await Categories.findAll()
        categories = categories.map(cat => cat.dataValues.name)
        console.log(categories);
        res.json(categories)
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}



module.exports = {getCategories}